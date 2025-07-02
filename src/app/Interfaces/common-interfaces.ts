export interface UserDataList {
  users: User[]
}

export interface User {
  id: string
  ssoid: string
  password: string
  firstName: string
  lastName: string
  emailId: string
  role: string
  icon: string
  location: string
  country: string
  userType: string
  gessostatus: string
  disciplines: Discipline[]
  isActive: boolean
  createdBy: string
  updatedBy: string
  updatedAt: number
  managerSSO: string
  version: string
  accessprivilegerole: string
  globalId: string
  empId: string
  loginId: string
}

export interface Discipline {
  id: string
  departments: Department[]
}

export interface Department {
  id: string
}

// For Project list
export interface ProjectDetails {
    projectId:             string;
    contractName:          string;
    racYear:               number;
    deliveryYear:          number;
    projectStatus:         string;
    racYearList:           number[];
    deliveryYearList:      number[];
    projectStatusList:     string[];
    isActive:              boolean;
    jobNumber:             string[];
    installationType:      any[];
    epcName:               string;
    country:               string;
    plantSiteCountry:      string[];
    plantSiteCustomerName: string[];
    equipSerialNumber:     string[];
    driverMmNames:         string[];
    drivenMmNames:         string[];
    connectorMmNames:      string[];
    trains:                Train[];
    tpsSegment:            string;
    tpsSegmentList:        string[];
    isMyProject:           boolean;
}

export interface Train {
    trainId:   string;
    trainName: string;
    mmInfo:    MmInfo[];
}

export interface MmInfo {
    type:      string;
    mmNames:   string[];
    childJobs: any[];
    jobNumber: string;
}

// ISPO Tabular data
export interface ISPOTabularDataList {
    activities: ISPOActivityData[];
}

export interface ISPOActivityData {
    id: number
  PROJECT_ID: string
  PRIMARY_RESOURCE_NAME: string
  ACT_ID: string
  ACTIVITY_NAME: string
  STEP_ID: string
  STEP_NAME: string
  EARLY_DATE: string
  IMPACTED_NCM: any
  IMPACTED_NCR: string
  LATE_FINISH: string
  PROMISE_DATE: any
  COMMENT: any
  ACKNOWLEDGE: any
  ACKNOWLEDGE_DATE: any
  PROJECT_NAME: string
  ROLE: string
  PRIMARY_RESOURCE_SSO: string
  LONG_DUMMY: any
  ACT_TYPE: string
  REAL_CODE: string
  EARLY_STATUS: string
  ACTUAL_FINISH: string
  TYPE: string
  EARLY_DUE_WEEK: string
  AGING: any
  UNIFIER_PROJECT_STATUS: any
  "P6-PROJ_CONTR_DELIVERY_DATE": any
  PROJECT_PHASE: string
  CONTRACT_NUMBER: string
  PL: any
  SUB_PL: any
  RAC_DT: string
  PLANNING_DATE: any
  TRAIN_TYPE: any
  SYSTEM_DATE: any
  ORGANIZATION_NAME: any
  JOB_TYPE: any
  DIVISION: any
  EXCLUDE: any
  FUNCTION: any
  DOC_TYPE: any
  LATE_STATUS: string
  MAIN_FUNCTION: any
  ITEM_AGGREGATION: any
  RCA?: string
  PO_NUMBER: any
  VDR_EARLY_DATE: any
  PO_SPECIFICATION_ID: any
  "SIGN-OFF_STATUS": any
  VENDOR: any
  APPROVE_TYPE: any
  DOCUMENT_DUE_DATE: any
  UNIFIER_DOCUMENT_STATUS: any
  UNIFIER_REVISION_STATUS: any
  DOC_EMISSION_CODE: any
  PM: string
  PROJECT_TYPE: any
  DELAY_CUSTOMER: any
  CUSTOMER_DOC: any
  RETURN_DATE_ACTUAL: any
  LAST_SUBMISSION: any
  FIRST_SUBMISSION: any
  DWG_ISSUE_NUMBER_FINAL: any
  PP: string
  ADDITIONAL_CUSTOMER_DOC: any
  PE: string
  DOC_RETURN_CODE: any
  RETURN_DATE_PLANNED: any
  PROJECT_STATUS_Primavera: any
  "TEAM LEADER": any
  GENERAL: any
  Sub_Division: any
  FLAG: any
  WA_IN_JOT_REQUIRED: any
  SORT_DATE: string
  dummy: any
  configurator: boolean
  latefinishwarning: boolean
}

export interface FWSummaryData {
  summary: FWSummary;
}

export interface FWSummary {
  weeklydatacount: FiscalWeekData[];
}

//FiscalWeekData
export interface FiscalWeekData {
    year:          number;
    fiscalWeek:    string;
    isCurrentWeek: string;
    startDate:     Date;
    endDate:       Date;
    total:         string;
    notCompleted:  string;
    weekText:      string;
}

export interface SummaryData {
  summary: SummaryDataItem;
}

// SummaryData
export interface SummaryDataItem {
    PreviousotdPercentage:   string;
    previousfw:              number;
    previouscompletedontime: string;
    previousbacklogcount:    string;
    currentotdPercentage:    string;
    currentFW:               number;
    currentcompletedontime:  string;
    currentbacklogcount:     string;
    currentwillmeet:         string;
    currentwontmeet:         string;
    nextotdPercentage:       string;
    nextFW:                  number;
    nextcompletedontime:     string;
    nextbacklogcount:        string;
    nextwontmeet:            string;
    nextwillmeet:            string;
    total:                   string;
    completedontime:         string;
    latecount:               string;
    backlog:                 string;
    opencount:               string;
    otdpercentage:           string;
    percentagecompletion:    string;
    autoasignedcount:        string;
    unasignedcount:          string;
    latepercentage:          number;
}

//ColumnList
export interface ColumnList {
    type:    string;
    columns: Column[];
}

export interface Column {
    column_name: string;
    display_yn:  boolean;
    freeze_yn:   boolean;
    sequence:    number;
    isActive:    boolean;
    id:          null;
}

