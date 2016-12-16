import {ObservableViewModel, ViewModel,Dictionary} from "ninjagoat";
import {ModelState} from "ninjagoat-projections";
import * as _ from "lodash";

@ViewModel("Size")
class DiagnosticViewModel extends ObservableViewModel<ModelState<any[]>>  {

    model:any[] = [];

    constructor(){
        super();
    }

    protected onData(data: ModelState<any[]>): void {
        if(data.model){
            this.model = data.model['list'];
        }
    }
}

export default DiagnosticViewModel;
