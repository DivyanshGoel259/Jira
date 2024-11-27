import db from "../libs/utils";
import { Roles, SprintStatus } from "../types";

interface Sprint {
  id?:string;
  name?: string;
  startDate: string;
  endDate: string;
  projectId?: string;
  userId: string;
  status?:SprintStatus
  newStatus?:SprintStatus
}

export const createSprint = async ({
  name,
  startDate,
  endDate,
  projectId,
  userId,
}: Sprint) => {
  try {
    const orgMember = await db.oneOrNone(
      `SELECT id FROM organization_member WHERE member_id=$(userId)`,
      { userId }
    );
    if (!orgMember.id) {
      throw new Error("User not a member of organization");
    }
    const newSprint = await db.oneOrNone(
      `INSERT INTO sprint(name,start_date,end_date,project_id) VALUES($(name),$(startDate),$(endDate),$(projectId)) RETURNING *`,
      { name, startDate, endDate, projectId }
    );
    return newSprint;
  } catch (err: any) {
    throw err;
  }
};


export const getAllSprint = async (project_id:string)=>{
  try{
    const sprints = await db.manyOrNone(
      `SELECT * FROM sprint WHERE project_id=$(project_id)`,
      { project_id }
    );
    return sprints;
  } catch (err) {
    throw err;
  }
}




export const updateSprintStatus = async ({id,userId,endDate,startDate,status,newStatus}:Sprint)=>{
  try{
    const isSprint = await db.oneOrNone(`SELECT * FROM sprint WHERE id = $(id)`,{id})
    if(!isSprint.id){
      throw new Error("Sprint Doesnt exists")
    }
    const isOrgMember = await db.oneOrNone(`SELECT * FROM organization_member WHERE member_id = $(userId)`,{userId})
    if(isOrgMember.role!=Roles.ADMIN){
      throw new Error("Only Admin Can Update Status of Sprint")
    }
    const start_date = new Date(startDate)
    const end_date = new Date(endDate)
    const now = new Date()
    if(newStatus==SprintStatus.ACTIVE && (now<start_date || now>end_date)){
      throw new Error("Can not start sprint out of its date range")
    }
    if(newStatus===SprintStatus.COMPLETED && status!==SprintStatus.ACTIVE){
      throw new Error("Can only compelete a active sprint")
    }
    const updatedSprint = await db.oneOrNone(`UPDATE sprint SET status=$(newStatus) WHERE id=$(id) RETURNING *`,{newStatus,id})
    return updatedSprint
  } catch (err) {
    throw err;
  }
}
