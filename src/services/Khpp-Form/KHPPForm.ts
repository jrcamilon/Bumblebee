export class KHPPForm {
       private _tagNumber: String;
       private _dueDate: Date;
       private _processedBy: String;
       private _type: String;
       private _comments: String;
       private _decoratorWeight: Number;
       private _decoratorCount: Number;
       private _baseWeight: Number;
       private _baseCount: Number;
       private _rimWeight: Number;
       private _rimCount: Number;
       private _bodyOrDiagnostic: String;

       public get bodyOrDiagnostic(): String {
              return this._bodyOrDiagnostic;
       }
       public set bodyOrDiagnostic(value: String) {
              this._bodyOrDiagnostic = value;
       }
       public get rimCount(): Number {
              return this._rimCount;
       }
       public set rimCount(value: Number) {
              this._rimCount = value;
       }
       public get rimWeight(): Number {
              return this._rimWeight;
       }
       public set rimWeight(value: Number) {
              this._rimWeight = value;
       }
       public get baseCount(): Number {
              return this._baseCount;
       }
       public set baseCount(value: Number) {
              this._baseCount = value;
       }
       public get baseWeight(): Number {
              return this._baseWeight;
       }
       
       public set baseWeight(value: Number) {
              this._baseWeight = value;
       }
       public get decoratorCount(): Number {
              return this._decoratorCount;
       }
       public set decoratorCount(value: Number) {
              this._decoratorCount = value;
       }
       public get decoratorWeight(): Number {
              return this._decoratorWeight;
       }
       public set decoratorWeight(value: Number) {
              this._decoratorWeight = value;
       }
       public get comments(): String {
              return this._comments;
       }
       public set comments(value: String) {
              this._comments = value;
       }
       public get type(): String {
              return this._type;
       }
       public set type(value: String) {
              this._type = value;
       }
       public get processedBy(): String {
              return this._processedBy;
       }
       public set processedBy(value: String) {
              this._processedBy = value;
       }
       public get dueDate(): Date {
              return this._dueDate;
       }
       public set dueDate(value: Date) {
              this._dueDate = value;
       }
       public get tagNumber(): String {
              return this._tagNumber;
       }
       public set tagNumber(value: String) {
              this._tagNumber = value;
       }
       
       constructor(tagNumber: String,
              dueDate: Date,
              processedBy: String,
              type: String,
              comments: String,
              decoratorWeight: Number, 
              decoratorCount: Number, 
              baseWeight: Number, 
              baseCount: Number, 
              rimCount: Number, 
              rimWeight: Number, 
              bodyOrDiagnostic: String) {
       this.dueDate = dueDate;
       this.processedBy = processedBy;
       this.type = type;
       this.comments = comments;
       this.decoratorCount = decoratorCount;
       this.decoratorWeight = decoratorWeight;
       this.baseWeight = baseWeight;
       this.baseCount = baseCount;
       this.rimWeight = rimWeight;
       this.rimCount = rimCount;
       this.bodyOrDiagnostic = bodyOrDiagnostic;

       }
}