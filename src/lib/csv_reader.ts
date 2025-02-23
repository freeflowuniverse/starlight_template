export enum PeriodType {
  Year = 'year',
  Month = 'month',
  Quarter = 'quarter'
}

export enum UnitType {
  Normal = 'normal',
  Thousand = 'thousand',
  Million = 'million',
  Billion = 'billion'
}

export enum AggregateType {
  Sum = 'sum',
  Avg = 'avg',
  Max = 'max'
}

export interface RowGetArgs {
  rowname?: string;
  nameFilter?: string[];
  includeFilter?: string[];
  excludeFilter?: string[];
  periodType?: PeriodType;
  aggregate?: boolean;
  aggregateType?: AggregateType;
  unit?: UnitType;
  title?: string;
  titleSub?: string;
  size?: string;
  rownameShow?: boolean;
  descrShow?: boolean;
  description?: string;
}

export interface CsvRow {
  name: string;
  description: string;
  aggregateType: AggregateType;
  tags: string[];
  subgroup: string;
  values: number[];
}

export class CsvReader {
  private rows: CsvRow[] = [];
  private readonly monthsPerYear = 12;
  private readonly monthsPerQuarter = 3;

  constructor(csvContent: string) {
    this.parseCsv(csvContent);
  }

  private parseCsv(content: string): void {
    const lines = content.split('\n');
    const headers = lines[0].split('|');
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const parts = line.split('|');
      const values = parts.slice(5).map(v => v === '-' ? 0 : Number(v));
      
      this.rows.push({
        name: parts[0],
        description: parts[1],
        aggregateType: parts[2] as AggregateType,
        tags: parts[3] ? parts[3].split(' ') : [],
        subgroup: parts[4],
        values: values
      });
    }
  }

  public getRowNames(args: RowGetArgs): string[] {
    return this.rows
      .filter(row => this.filterRow(row, args))
      .map(row => row.name);
  }

  public getRowName(args: RowGetArgs): string {
    const names = this.getRowNames(args);
    if (names.length !== 1) {
      throw new Error(`Expected exactly one row, found ${names.length}`);
    }
    return names[0];
  }

  private filterRow(row: CsvRow, args: RowGetArgs): boolean {
    if (args.rowname && row.name !== args.rowname) {
      return false;
    }

    if (args.nameFilter?.length && !args.nameFilter.includes(row.name)) {
      return false;
    }

    if (args.includeFilter?.length) {
      const matches = args.includeFilter.some(filter => {
        const [key, pattern] = filter.split(':');
        return row.tags.some(tag => {
          const [tagKey, tagValue] = tag.split(':');
          if (key !== tagKey) return false;
          if (pattern.endsWith('*')) {
            return tagValue.startsWith(pattern.slice(0, -1));
          }
          return tagValue === pattern;
        });
      });
      if (!matches) return false;
    }

    if (args.excludeFilter?.length) {
      const matches = args.excludeFilter.some(filter => {
        const [key, pattern] = filter.split(':');
        return row.tags.some(tag => {
          const [tagKey, tagValue] = tag.split(':');
          if (key !== tagKey) return false;
          if (pattern.endsWith('*')) {
            return tagValue.startsWith(pattern.slice(0, -1));
          }
          return tagValue === pattern;
        });
      });
      if (matches) return false;
    }

    return true;
  }

  public getHeaderAsList(periodType: PeriodType): string[] {
    const totalMonths = this.rows[0]?.values.length ?? 0;
    const result: string[] = [];

    switch (periodType) {
      case PeriodType.Year:
        for (let i = 1; i <= Math.floor(totalMonths / this.monthsPerYear); i++) {
          result.push(`Y${i}`);
        }
        break;
      case PeriodType.Quarter:
        for (let i = 1; i <= Math.floor(totalMonths / this.monthsPerQuarter); i++) {
          result.push(`Q${i}`);
        }
        break;
      case PeriodType.Month:
        for (let i = 1; i <= totalMonths; i++) {
          result.push(`M${i}`);
        }
        break;
    }

    return result;
  }

  public getDataAsList(args: RowGetArgs): number[] {
    if (!args.rowname) {
      throw new Error('rowname must be specified');
    }

    const row = this.rows.find(r => r.name === args.rowname);
    if (!row) {
      throw new Error(`Row not found: ${args.rowname}`);
    }

    let values = [...row.values];

    // Convert to period type
    if (args.periodType) {
      values = this.convertToPeriodType(values, args.periodType);
    }

    // Apply unit conversion
    if (args.unit) {
      const factor = this.getUnitConversionFactor(args.unit);
      values = values.map(v => v / factor);
    }

    return values;
  }

  private convertToPeriodType(values: number[], periodType: PeriodType): number[] {
    const result: number[] = [];
    
    switch (periodType) {
      case PeriodType.Year:
        for (let i = 0; i < values.length; i += this.monthsPerYear) {
          const yearValues = values.slice(i, i + this.monthsPerYear);
          result.push(yearValues.reduce((a, b) => a + b, 0));
        }
        break;
      case PeriodType.Quarter:
        for (let i = 0; i < values.length; i += this.monthsPerQuarter) {
          const quarterValues = values.slice(i, i + this.monthsPerQuarter);
          result.push(quarterValues.reduce((a, b) => a + b, 0));
        }
        break;
      case PeriodType.Month:
        return values;
    }

    return result;
  }

  private getUnitConversionFactor(unit: UnitType): number {
    switch (unit) {
      case UnitType.Normal:
        return 1;
      case UnitType.Thousand:
        return 1000;
      case UnitType.Million:
        return 1000000;
      case UnitType.Billion:
        return 1000000000;
    }
  }
}
