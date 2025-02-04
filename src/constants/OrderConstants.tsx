export class OrderConstants {
  public static readonly EntityName: string = "stn_order";
  public static readonly EntityCollectionName: string = "stn_orders";

  //#region Attributes
  /** Type: Uniqueidentifier, RequiredLevel: SystemRequired */
  public static readonly PrimaryKey: string = "stn_orderid";
  /** Type: String, RequiredLevel: None, MaxLength: 100, Format: Text */
  public static readonly PrimaryName: string = "stn_ordernumber";
  /** Type: Uniqueidentifier, RequiredLevel: None */
  public static readonly DeprecatedStageId: string = "stageid";
  /** Type: String, RequiredLevel: None, MaxLength: 1250, Format: Text */
  public static readonly DeprecatedTraversedPath: string = "traversedpath";
  /** Type: Money, RequiredLevel: None, MinValue: 0, MaxValue: 922337203685477, Precision: 2 */
  public static readonly AdditionalCharges: string = "stn_additionalcharges";
  /** Type: String, RequiredLevel: None, MaxLength: 100, Format: Text */
  public static readonly Affidavit: string = "stn_affidavit";
  /** Type: Lookup, RequiredLevel: None, Targets: stn_salescontract */
  public static readonly AlternateContract: string = "stn_alternatecontractid";
  /** Type: Decimal, RequiredLevel: None, MinValue: -100000000000, MaxValue: 100000000000, Precision: 2 */
  public static readonly AppliedFreightRate: string = "stn_appliedfreightrate";
  /** Type: Money, RequiredLevel: None, MinValue: 0, MaxValue: 922337203685477, Precision: 2 */
  public static readonly ApprovedOrderBalance: string =
    "stn_approvedorderbalance";
  /** Type: Lookup, RequiredLevel: None, Targets: msdyn_operationalsite */
  public static readonly Branch: string = "stn_branch";
  /** Type: String, RequiredLevel: None, MaxLength: 100, Format: Text */
  public static readonly CalendarControlPCF: string = "stn_calendarcontrolpcf";
  /** Type: Lookup, RequiredLevel: None, Targets: stn_carrier */
  public static readonly Carrier: string = "stn_carrierid";
  /** Type: Lookup, RequiredLevel: None, Targets: product */
  public static readonly Commodity: string = "stn_commodityid";
  /** Type: Lookup, RequiredLevel: None, Targets: cdm_company */
  public static readonly Company: string = "stn_companyid";
  /** Type: Picklist, RequiredLevel: None, DisplayName: Contract Types, OptionSetType: Picklist, DefaultFormValue: -1 */
  public static readonly ContractType: string = "stn_contracttypecode";
  /** Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal */
  public static readonly CreditCheckLastRun: string = "stn_creditchecklastrun";
  /** Type: Lookup, RequiredLevel: None, Targets: stn_creditgroup */
  public static readonly CreditGroup: string = "stn_creditgroupid";
  /** Type: Virtual, RequiredLevel: None, DisplayName: Credit Hold Reason, OptionSetType: Picklist */
  public static readonly CreditHoldReason: string = "stn_creditholdreason";
  /** Type: Lookup, RequiredLevel: None, Targets: stn_creditreleasereason */
  public static readonly CreditReleaseReason: string =
    "stn_creditreleasereasonid";
  /** Type: Picklist, RequiredLevel: None, DisplayName: Credit Release Reasons, OptionSetType: Picklist, DefaultFormValue: -1 */
  public static readonly CreditReleaseReason_DEPRECATED_: string =
    "stn_creditreleasereason";
  /** Type: Lookup, RequiredLevel: None, Targets: systemuser */
  public static readonly CreditReleasedBy: string = "stn_creditreleasedby";
  /** Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal */
  public static readonly CreditReleasedDate: string = "stn_creditreleaseddate";
  /** Type: Picklist, RequiredLevel: None, DisplayName: Account Status, OptionSetType: Picklist, DefaultFormValue: -1 */
  public static readonly CreditStatus_DEPRECATED_: string = "stn_creditstatus";
  /** Type: Lookup, RequiredLevel: None, Targets: transactioncurrency */
  public static readonly Currency: string = "transactioncurrencyid";
  /** Type: Lookup, RequiredLevel: ApplicationRequired, Targets: account */
  public static readonly Customer: string = "stn_customerid";
  /** Type: String, RequiredLevel: None, MaxLength: 100, Format: Text */
  public static readonly CustomerInvoice: string = "stn_customerinvoice";
  /** Type: Lookup, RequiredLevel: None, Targets: stn_dispatchpool */
  public static readonly DispatchPool: string = "stn_dispatchpoolid";
  /** Type: String, RequiredLevel: None, MaxLength: 100, Format: Text */
  public static readonly DocumentPCF: string = "stn_documentpcf";
  /** Type: Lookup, RequiredLevel: None, Targets: contact */
  public static readonly Driver: string = "stn_driverid";
  /** Type: Decimal, RequiredLevel: None, MinValue: 0.0000000001, MaxValue: 100000000000, Precision: 12 */
  public static readonly ExchangeRate: string = "exchangerate";
  /** Type: String, RequiredLevel: None, MaxLength: 100, Format: Text */
  public static readonly Freight: string = "stn_freight";
  /** Type: Money, RequiredLevel: None, MinValue: 0, MaxValue: 922337203685477, Precision: 2 */
  public static readonly FreightAdditional: string = "stn_freightadditional";
  /** Type: Money, RequiredLevel: None, MinValue: 0, MaxValue: 922337203685477, Precision: 2 */
  public static readonly FreightBaseRate: string = "stn_freightbaserate";
  /** Type: Decimal, RequiredLevel: None, MinValue: 0, MaxValue: 100, Precision: 2 */
  public static readonly FuelSurcharge: string = "stn_fuelsurcharge";
  /** Type: Memo, RequiredLevel: None, MaxLength: 2000 */
  public static readonly Instructions: string = "stn_instructions";
  /** Type: Memo, RequiredLevel: None, MaxLength: 2000 */
  public static readonly InternalComments: string = "stn_internalcomments";
  /** Type: Lookup, RequiredLevel: None, Targets: msdyn_operationalsite */
  public static readonly InventoryLocation: string = "stn_inventorylocationid";
  /** Type: Picklist, RequiredLevel: None, DisplayName: Invoicing Status, OptionSetType: Picklist, DefaultFormValue: 272280000 */
  public static readonly InvoicingStatus: string = "stn_invoicingstatus";
  /** Type: Memo, RequiredLevel: None, MaxLength: 2000 */
  public static readonly OrderComments: string = "stn_ordercomments";
  /** Type: Lookup, RequiredLevel: None, Targets: stn_orderfavorite */
  public static readonly OrderFavorite: string = "stn_orderfavoriteid";
  /** Type: Picklist, RequiredLevel: None, DisplayName: Order Stages, OptionSetType: Picklist, DefaultFormValue: -1 */
  public static readonly OrderStage: string = "stn_orderstagecode";
  /** Type: Status, RequiredLevel: None, DisplayName: Status Reason, OptionSetType: Status */
  public static readonly OrderStatus: string = "statuscode";
  /** Type: Picklist, RequiredLevel: None, DisplayName: Order Sub-Type, OptionSetType: Picklist, DefaultFormValue: -1 */
  public static readonly OrderSub_Type: string = "stn_ordersubtypecode";
  /** Type: Picklist, RequiredLevel: Recommended, DisplayName: Order Types, OptionSetType: Picklist, DefaultFormValue: 924450000 */
  public static readonly OrderType: string = "stn_ordertypecode";
  /** Type: Money, RequiredLevel: None, MinValue: 0, MaxValue: 922337203685477, Precision: 2 */
  public static readonly OrderValue: string = "stn_ordervalue";
  /** Type: Lookup, RequiredLevel: None, Targets: stn_orderworkflow */
  public static readonly OrderWorkflowInstance: string = "stn_orderworkflowid";
  /** Type: String, RequiredLevel: None, MaxLength: 4000, Format: Text */
  public static readonly OrderWorkflowStage: string = "stn_activestage";
  /** Type: Integer, RequiredLevel: None, MinValue: -2147483648, MaxValue: 2147483647 */
  public static readonly OrdersPerDay: string = "stn_ordersperday";
  /** Type: String, RequiredLevel: None, MaxLength: 100, Format: Text */
  public static readonly Origin: string = "stn_origin";
  /** Type: Lookup, RequiredLevel: None, Targets: stn_order */
  public static readonly OriginatingOrder: string = "stn_originatingorderid";
  /** Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False */
  public static readonly OverrideInvoiceControl: string =
    "stn_overrideinvoicecontrol";
  /** Type: Owner, RequiredLevel: SystemRequired, Targets: systemuser,team */
  public static readonly Owner: string = "ownerid";
  /** Type: Lookup, RequiredLevel: SystemRequired, Targets: businessunit */
  public static readonly OwningBusinessUnit: string = "owningbusinessunit";
  /** Type: Virtual, RequiredLevel: None, DisplayName: Credit Hold Reason, OptionSetType: Picklist */
  public static readonly PreviousCreditHoldReasons: string =
    "stn_previouscreditholdreasoncodes";
  /** Type: DateTime, RequiredLevel: None, Format: DateOnly, DateTimeBehavior: TimeZoneIndependent */
  public static readonly PreviousShipDate: string = "stn_previousshipdate";
  /** Type: Uniqueidentifier, RequiredLevel: None */
  public static readonly ProcessId: string = "processid";
  /** Type: Lookup, RequiredLevel: None, Targets: product */
  public static readonly Product: string = "stn_productid";
  /** Type: Lookup, RequiredLevel: None, Targets: stn_purchasecontract */
  public static readonly PurchaseContract: string = "stn_purchasecontractid";
  /** Type: Lookup, RequiredLevel: None, Targets: stn_purchasecontractline */
  public static readonly PurchaseContractLine: string =
    "stn_purchasecontractlineid";
  /** Type: Integer, RequiredLevel: None, MinValue: -2147483648, MaxValue: 2147483647 */
  public static readonly Quantity: string = "stn_quantity";
  /** Type: String, RequiredLevel: None, MaxLength: 100, Format: Text */
  public static readonly RailCar: string = "stn_railcarnumber";
  /** Type: String, RequiredLevel: None, MaxLength: 50, Format: Text */
  public static readonly Release: string = "stn_releasenumber";
  /** Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False */
  public static readonly RememberDispatchPool: string =
    "stn_rememberdispatchpool";
  /** Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False */
  public static readonly RememberInstructions: string =
    "stn_rememberinstructions";
  /** Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False */
  public static readonly RememberInternalComments: string =
    "stn_rememberinternalcomments";
  /** Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False */
  public static readonly RememberOrderComments: string =
    "stn_rememberordercomments";
  /** Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False */
  public static readonly RememberQuantity: string = "stn_rememberquantity";
  /** Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False */
  public static readonly RememberTrailerType: string =
    "stn_remembertrailertype";
  /** Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False */
  public static readonly RememberTransportationMode: string =
    "stn_remembertransportationmode";
  /** Type: Lookup, RequiredLevel: None, Targets: stn_salescontract */
  public static readonly SalesContract: string = "stn_salescontractid";
  /** Type: Lookup, RequiredLevel: None, Targets: stn_contractline */
  public static readonly SalesContractLine: string = "stn_salescontractlineid";
  /** Type: DateTime, RequiredLevel: None, Format: DateOnly, DateTimeBehavior: TimeZoneIndependent */
  public static readonly ShipDate: string = "stn_shipdate";
  /** Type: Picklist, RequiredLevel: None, DisplayName: Ship Periods, OptionSetType: Picklist, DefaultFormValue: -1 */
  public static readonly ShipPeriod: string = "stn_shipperiodcode";
  /** Type: Lookup, RequiredLevel: None, Targets: stn_customeraddress */
  public static readonly ShippingAddress: string = "stn_shippingaddress";
  /** Type: State, RequiredLevel: SystemRequired, DisplayName: Status, OptionSetType: State */
  public static readonly Status: string = "statecode";
  /** Type: String, RequiredLevel: None, MaxLength: 100, Format: Text */
  public static readonly Supplier: string = "stn_supplier";
  /** Type: Lookup, RequiredLevel: None, Targets: msdyn_vendor */
  public static readonly Supplier1: string = "stn_supplierid";
  /** Type: Integer, RequiredLevel: None, MinValue: 0, MaxValue: 2147483647 */
  public static readonly TotalRequiredDocuments: string =
    "stn_totalrequireddocuments";
  /** Type: Integer, RequiredLevel: None, MinValue: 0, MaxValue: 2147483647 */
  public static readonly TotalReviewedDocuments: string =
    "stn_totalrevieweddocuments";
  /** Type: Integer, RequiredLevel: None, MinValue: 0, MaxValue: 2147483647 */
  public static readonly TotalUploadedDocuments: string =
    "stn_totaluploadeddocuments";
  /** Type: Picklist, RequiredLevel: None, DisplayName: Trailer Types, OptionSetType: Picklist, DefaultFormValue: -1 */
  public static readonly TrailerType: string = "stn_trailertypecode";
  /** Type: Picklist, RequiredLevel: None, DisplayName: Transportation Modes, OptionSetType: Picklist, DefaultFormValue: -1 */
  public static readonly TransportationMode: string =
    "stn_transportationmodecode";
  /** Type: String, RequiredLevel: None, MaxLength: 100, Format: Text */
  public static readonly Unit: string = "stn_unitnumber";
  /** Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 2 */
  public static readonly UnitPrice: string = "stn_unitprice";
  /** Type: Lookup, RequiredLevel: None, Targets: uom */
  public static readonly UOM: string = "stn_unitofmeasureid";
  /** Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal */
  public static readonly ValueApprovedDate: string = "stn_valueapproveddate";
  /** Type: Lookup, RequiredLevel: None, Targets: msdyn_vendor */
  public static readonly Vendor: string = "stn_vendor";
  /** Type: DateTime, RequiredLevel: None, Format: DateOnly, DateTimeBehavior: TimeZoneIndependent */
  public static readonly WeighDate: string = "stn_weighdate";
  //#endregion Attributes
}

/* OptionSets */

export enum ContractType_OptionSet {
  SalesContract = 924450000,
  PurchaseContract = 272280001,
  SpotContract = 924450001,
}

export enum CreditHoldReason_OptionSet {
  Exceededcreditlimit = 1000,
  CODTermsofpayment = 1005,
  Dayspastdue = 1010,
  Accountstatus = 1015,
  Creditlimitexpired = 1020,
  Settlementdiscountincreased = 1025,
  Pastdueamount = 1030,
  LoadApproval = 1035,
  Termsofpaymentincreased = 1040,
  DaysOverdue = 1045,
}

export enum CreditReleaseReason_DEPRECATED__OptionSet {
  ApprovedFunds = 272280000,
  AutomaticRelease = 272280001,
  ApprovedCADAccount = 272280002,
  ApprovedCheckOnTheWay = 272280003,
  ApprovedFundsInHandButNotApplied = 272280004,
  ApprovedPerTheGM = 272280005,
  ApprovedInternalApplicationIssues = 272280006,
  ApprovedLogisticsIssues = 272280007,
  ApprovedPerSeniorManagement = 272280008,
  ApprovedLoadReleasedTruckWaiting = 272280009,
  ApprovedReplacementLoad = 272280010,
  ApprovedRejected_ReturnedLoad = 272280011,
  ApprovedLoadalreadyShippedPriortoApproval = 272280012,
  ApprovedPerTrader = 272280013,
}

export enum CreditStatus_DEPRECATED__OptionSet {
  Active = 272280002,
  Bankruptcy = 272280003,
  CreditHold = 924450000,
  Deactivating = 272280001,
  Inactive = 272280004,
}

export enum InvoicingStatus_OptionSet {
  Notinvoiced = 272280000,
  Invoiced = 272280001,
  Onhold = 272280002,
  Bundled = 272280003,
  Sent = 272280004,
  Printed = 272280005,
}

export enum OrderStage_OptionSet {
  Product = 924450000,
  Contract = 924450001,
  Credit = 924450002,
  Transportation = 924450003,
  Dispatch = 924450004,
}

export enum OrderStatus_OptionSet {
  Draft = 272280004,
  _10DayHold = 924450001,
  PendingCreditVerification = 272280007,
  PendingApproval = 924450002,
  Approved = 924450003,
  DispatchComplete = 272280006,
  Shipped = 272280001,
  Canceled = 272280002,
  Invoiced = 272280003,
}

export enum OrderSub_Type_OptionSet {
  Commodity_Grain = 272280000,
  Inventory_MixedFeed = 272280001,
}

export enum OrderType_OptionSet {
  OUTBOUNDSalesOrder = 924450000,
  INBOUNDPurchaseOrder = 924450001,
  DirectShip = 272280001,
}

export enum PreviousCreditHoldReasons_OptionSet {
  Exceededcreditlimit = 1000,
  CODTermsofpayment = 1005,
  Dayspastdue = 1010,
  Accountstatus = 1015,
  Creditlimitexpired = 1020,
  Settlementdiscountincreased = 1025,
  Pastdueamount = 1030,
  LoadApproval = 1035,
  Termsofpaymentincreased = 1040,
  DaysOverdue = 1045,
}

export enum ShipPeriod_OptionSet {
  PM = 924450000,
  AM = 924450001,
}

export enum Status_OptionSet {
  Active = 0,
  Inactive = 1,
}

export enum TrailerType_OptionSet {
  Floor = 924450000,
  Stinger = 924450001,
  FlatBed = 924450002,
  Van = 924450003,
  Tanker = 924450004,
  Pneumatic = 924450005,
  _10_Wheeler = 924450006,
  Belt = 924450007,
  EndDump = 924450008,
  Hopper = 924450009,
  LiveBottom = 924450010,
  Hopper_Floor_Belt = 924450011,
  Any = 924450012,
  FOBCustomerPickup = 924450013,
  DELBoughtDelivered = 924450014,
}

export enum TransportationMode_OptionSet {
  Truck = 924450000,
  Rail = 924450001,
  Container = 924450002,
  Barge = 924450003,
  Vessel = 924450004,
}
