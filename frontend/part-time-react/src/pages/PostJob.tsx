import React,{useState} from 'react';

//Data structure for the form
interface JobFormData{
    jobTitle: string;
    jobCategory: string;
    minSalary: number;
    maxSalary: number;
    jobLocation: string;
    startTime: string;
    endTime: string;
    description: string;
    requirements: string;
    benefits: string;
    vacancies: number;
    

}

