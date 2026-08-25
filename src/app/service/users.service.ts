import { Injectable } from '@angular/core';
import { IresUsers, Iusers } from '../models/users';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
UsersDetails:Array<Iusers>=[
    {
      userName: 'Sanket Powar',
      userId: 'EMP101',
      userRole: 'buyer',
      profileDescription: '3 years of experience in Angular development.',
      profileImage: 'data:image/jpeg;base64,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',
      skills: ['Angular', 'TypeScript', 'RxJS', 'Bootstrap'],
      experienceYears: '5 to 7 years',
      isActive: false,
      address: {
        current: {
          city: 'Pune',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '411001'
        },
        permanent: {
          city: 'Kolhapur',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '416001'
        }
      },
      isAddSame: false
    },
    {
      userName: 'Manisha Patil',
      userId: 'EMP102',
      userRole: 'Admin',
      profileDescription: 'Experienced in Angular and responsive UI development.',
      profileImage: 'https://cdn-icons-png.flaticon.com/512/6997/6997662.png',
      skills: ['Angular', 'HTML', 'CSS', 'JavaScript'],
      experienceYears: '3 to 5 years',
      isActive: true,
      address: {
        current: {
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '400001'
        },
        permanent: {
          city: 'Satara',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '415001'
        }
      },
      isAddSame: true
    },
    {
      userName: 'dev Patil',
      userId: 'EMP103',
      userRole: 'superadmin',
      profileDescription: 'Experienced in Angular and responsive UI development.',
      profileImage: 'https://cdn-icons-png.flaticon.com/512/6997/6997662.png',
      skills: ['Angular', 'HTML', 'JavaScript'],
      experienceYears: '3 to 5 years',
      isActive: true,
      address: {
        current: {
          city: 'mumbai',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '400048'
        },
        permanent: {
          city: 'pune',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '411037'
        }
      },
      isAddSame: true
    }
  ];

  fetchuserdata():Observable<Iusers[]>{
    return of(this.UsersDetails)
  }

  fetchuserId(id:string):Observable<Iusers>{
    let users=this.UsersDetails.find(t=>t.userId===id)!
    return of(users)
  }

  createusers(user:Iusers):Observable<IresUsers<Iusers>>{
    this.UsersDetails.unshift(user)
    return of({
      msg:`The user ${user.userName} is added successfully!!`,
      data:user
    })
  }

  removeuser(users:string):Observable<IresUsers<Iusers>>{
    let getindex=this.UsersDetails.findIndex(t=>t.userId===users)
   let usersId= this.UsersDetails.splice(getindex,1)
   return of({
    msg:`The user ${usersId[0].userName} is removed Successfully!!`,
    data:usersId[0]
   })
  }

  updateuser(user:Iusers):Observable<IresUsers<Iusers>>{
    let getInde=this.UsersDetails.findIndex(t=>t.userId===user.userId)
    this.UsersDetails[getInde]=user
    return of({
      msg:`The user ${user.userName} is Updated Successfully!!`,
      data:user
    })
  }
}