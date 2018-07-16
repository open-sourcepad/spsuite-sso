import { Injectable } from '@angular/core';

const date = new Date;

@Injectable()
export class ProjectPortalData {

  projects = [
    { id: 1, name: 'Bedrock', slug: 'bedrock', start_date: date },
    { id: 2, name: 'Commutyble', slug: 'commutyble', start_date: date },
    { id: 3, name: 'Divorcify', slug: 'divorcify', start_date: date },
    { id: 4, name: 'SMS360', slug: 'sms360', start_date: date },
    { id: 5, name: 'Parishfind', slug: 'parishfind', start_date: date },
    { id: 6, name: 'Proferma', slug: 'proferma', start_date: date },
    { id: 7, name: 'Golfcrow', slug: 'golfcrow', start_date: date },
    { id: 8, name: 'Sexyselfies', slug: 'sexyselfies', start_date: date },
    { id: 9, name: 'GH', slug: 'gh', start_date: date },
    { id: 4, name: 'SMS360', slug: 'sms360', start_date: date },
    { id: 5, name: 'Parishfind', slug: 'parishfind', start_date: date },
    { id: 6, name: 'Proferma', slug: 'proferma', start_date: date },
    { id: 7, name: 'Golfcrow', slug: 'golfcrow', start_date: date },
    { id: 8, name: 'Sexyselfies', slug: 'sexyselfies', start_date: date },
  ]

  archived_projects = [
    { id: 10, name: '1000museums', slug: '1000museums', start_date: date },
    { id: 11, name: 'Chouxbox', slug: 'chouxbox', start_date: date },
  ]
}
