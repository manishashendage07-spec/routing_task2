import { Injectable } from '@angular/core';
import { IFairs } from '../models/fairs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FairsService {
fairsArr: Array<IFairs> = [
  {
    fairId: '73a84c5dbb1cf20010a1f001',
    fairName: 'ISS New York Fair',
    startDate: 1683523200,
    endDate: 1683696000,
    timezoneId: 'Eastern Standard Time',
    location: {
      addressOne: 'Hilton Midtown',
      addressTwo: '1335 Avenue of the Americas',
      city: 'New York',
      state: 'New York',
      country: 'United States',
      zip: '10019'
    },  
    numberOfUsersRegistered: 120,
    numberOfSchoolsRegistered: 65,
    isCandidateRegistered: true,
    bannerUrl: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee',
    showRegisteredUsersToCandidate: true,
    showRegisteredUsersToSchools: true,
    showRegisteredSchoolsToCandidate: true,
    showRegisteredSchoolsToSchools: false,
    fairStatus: 'published',
    fairStartTime: '9:00 AM',
    fairEndTime: '5:00 PM',
    type: 'InPerson',
    candidateDescription:
      '<p>Meet leading international schools in New York and explore exciting teaching opportunities.</p>',
    schoolDescription:
      '<p>Recruit top teaching talent from around the world at the New York Fair.</p>'
  },

  {
    fairId: '73a84c5dbb1cf20010a1f002',
    fairName: 'ISS London Fair',
    startDate: 1686115200,
    endDate: 1686288000,
    timezoneId: 'Greenwich Mean Time',
    location: {
      addressOne: 'London Marriott Hotel',
      addressTwo: '140 Park Lane',
      city: 'London',
      state: 'England',
      country: 'United Kingdom',
      zip: 'W1K 7AA'
    },
    numberOfUsersRegistered: 90,
    numberOfSchoolsRegistered: 48,
    isCandidateRegistered: false,
    bannerUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
    showRegisteredUsersToCandidate: false,
    showRegisteredUsersToSchools: false,
    showRegisteredSchoolsToCandidate: true,
    showRegisteredSchoolsToSchools: true,
    fairStatus: 'published',
    fairStartTime: '10:00 AM',
    fairEndTime: '4:00 PM',
    type: 'InPerson',
    candidateDescription:
      '<p>Connect with prestigious international schools across Europe.</p>',
    schoolDescription:
      '<p>Find qualified educators for your international school in London.</p>'
  },

  {
    fairId: '73a84c5dbb1cf20010a1f003',
    fairName: 'ISS Dubai Virtual Fair',
    startDate: 1690848000,
    endDate: 1690848000,
    timezoneId: 'Gulf Standard Time',
    location: null,
    numberOfUsersRegistered: 200,
    numberOfSchoolsRegistered: 70,
    isCandidateRegistered: true,
    bannerUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    showRegisteredUsersToCandidate: true,
    showRegisteredUsersToSchools: false,
    showRegisteredSchoolsToCandidate: true,
    showRegisteredSchoolsToSchools: false,
    fairStatus: 'published',
    fairStartTime: '11:00 AM',
    fairEndTime: '3:00 PM',
    type: 'Virtual',
    candidateDescription:
      '<p>Attend the Dubai Virtual Fair from anywhere in the world.</p>',
    schoolDescription:
      '<p>Interview talented candidates online through our virtual platform.</p>'
  },

  {
    fairId: '73a84c5dbb1cf20010a1f004',
    fairName: 'ISS Singapore Fair',
    startDate: 1693526400,
    endDate: 1693699200,
    timezoneId: 'Singapore Standard Time',
    location: {
      addressOne: 'Marina Bay Sands',
      addressTwo: '10 Bayfront Avenue',
      city: 'Singapore',
      state: 'Singapore',
      country: 'Singapore',
      zip: '018956'
    },
    numberOfUsersRegistered: 75,
    numberOfSchoolsRegistered: 40,
    isCandidateRegistered: false,
    bannerUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd',
    showRegisteredUsersToCandidate: false,
    showRegisteredUsersToSchools: true,
    showRegisteredSchoolsToCandidate: true,
    showRegisteredSchoolsToSchools: true,
    fairStatus: 'draft',
    fairStartTime: '8:30 AM',
    fairEndTime: '4:30 PM',
    type: 'InPerson',
    candidateDescription:
      '<p>Discover teaching opportunities across Asia.</p>',
    schoolDescription:
      '<p>Meet experienced international educators in Singapore.</p>'
  },

  {
    fairId: '73a84c5dbb1cf20010a1f005',
    fairName: 'ISS Sydney Virtual Fair',
    startDate: 1698796800,
    endDate: 1698796800,
    timezoneId: 'Australian Eastern Standard Time',
    location: null,
    numberOfUsersRegistered: 155,
    numberOfSchoolsRegistered: 58,
    isCandidateRegistered: true,
    bannerUrl: 'https://images.unsplash.com/photo-1506973035872-a4f23ef6b47a',
    showRegisteredUsersToCandidate: true,
    showRegisteredUsersToSchools: true,
    showRegisteredSchoolsToCandidate: false,
    showRegisteredSchoolsToSchools: false,
    fairStatus: 'published',
    fairStartTime: '9:30 AM',
    fairEndTime: '2:30 PM',
    type: 'Virtual',
    candidateDescription:
      '<p>Join Australia’s largest online international recruitment fair.</p>',
    schoolDescription:
      '<p>Connect with skilled educators through virtual interviews.</p>'
  }
];
  constructor() { }
  fetchFairsArr(): Observable<IFairs[]> {
    return of(this.fairsArr)
  }
    
  fetchFairById(id: string): Observable<IFairs>{
    let fairObj = this.fairsArr.find(f => f.fairId === id)!;
    return of(fairObj);
  }

}