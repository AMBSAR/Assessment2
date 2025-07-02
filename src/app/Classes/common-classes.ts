import { MmInfo, ProjectDetails, Train } from "../Interfaces/common-interfaces";

export class IEPModuleData {
    Icon: string = '';
    ModuleName: string = '';
    RouterLink: string = '';

    constructor(icon: string, name: string, link: string) {
        this.Icon = icon;
        this.ModuleName = name;
        this.RouterLink = link;
    }
}

export class JobData {
    jobNumber: string = '';
    isSelected: boolean = false;
    isFavourite: boolean = false;
    parentTrain: any;

    constructor(train: TrainData, jobNumber: string) {
        this.parentTrain = train;
        this.jobNumber = jobNumber;
    }

    getParentTrain() {
        return this.parentTrain;
    }

    getParentProject() {
        return this.parentTrain?.getParentProject();
    }
}

export class TrainData {
    parentProject: any;
    trainId: string = '';
    trainName: string = '';
    isSelected: boolean = false;
    jobNumbers: JobData[] = [];

    constructor (project: ProjectData, train: Train) {
        this.parentProject = project;
        this.trainId = train.trainId;
        this.trainName = train.trainName;
        
        if (train.mmInfo != null && train.mmInfo.length > 0) {
            train.mmInfo.forEach((x: MmInfo ) => {
                if (x.jobNumber != null && x.jobNumber != '') {
                this.jobNumbers.push(new JobData(this, x.jobNumber));
                }
                
                if (x.childJobs != null && x.childJobs.length > 0) {
                    x.childJobs.forEach((x: string) => {
                        if (x != null && x != '') {
                        this.jobNumbers.push(new JobData(this, x));
                        }
                    });
                }
            } )
        }
    }

    getParentProject()
    {
        return this.parentProject;
    }
}

export class ProjectData {
    private static itemCounter: number = 0;
    projectId: string = '';
    projectName: string = '';
    isSelected: boolean = false;
    isFavourite: boolean = false;
    isActive: boolean = true;
    trains: TrainData[] = [];

    constructor (project: ProjectDetails) {
        this.projectId = project.projectId;
        this.projectName = project.contractName;
        this.isActive = project.isActive;
        ++ProjectData.itemCounter;

        if (ProjectData.itemCounter % 5 == 0) {
            this.isFavourite = true;
        }

        if (project.trains != null && project.trains.length > 0) {
            project.trains.forEach((x: Train ) => {
                this.trains.push(new TrainData(this, x));
            } )
        }
    }
}
