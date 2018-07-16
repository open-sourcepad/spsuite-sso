import { Injectable } from '@angular/core';

@Injectable()
export class ProjectDetailsData {

  project = {
    name: "Bedrock",
    pt_project_id: "019238393",
    type: "product",
    status: "active",
    start_date: "06/29/2018",
    live_date: null,
    members: [
      { name: "Alvin", email: "alving@sourcepad.com", position: "Dev" },
      { name: "Erik", email: "erikm@sourcepad.com", position: "Dev" },
      { name: "Mark", email: "marka@sourcepad.com", position: "Dev" },
      { name: "Abby", email: "abby@sourcepad.com", position: "Dev" },
      { name: "Virna", email: "virnaq@sourcepad.com", position: "PM" }
    ]
  }
}