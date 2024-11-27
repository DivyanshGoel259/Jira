import db from "../libs/utils";
import { Roles } from "../types";

export const createProject = async (payload: any, userId: string) => {
  try {
    const orgMember = await db.oneOrNone(
      `SELECT role FROM organization_member WHERE member_id = $(userId)`,
      { userId }
    );
    if (orgMember.role != Roles.ADMIN) {
      throw new Error("Only Admins can Create Project");
    }
    const newProject = await db.oneOrNone(
      `INSERT INTO project(name,key,description,organization_id) VALUES($(name),$(key),$(description),$(orgId))`,
      payload
    );
    return newProject;
  } catch (err: any) {
    throw err;
  }
};

export const getAllProjects = async (orgId: string) => {
  try {
    const projects = await db.manyOrNone(
      `SELECT * FROM project WHERE organization_id = $(orgId)`,
      { orgId }
    );
    return projects;
  } catch (err: any) {
    throw err;
  }
};

export const deleteProject = async (projectId :string , userId: string) => {
  try {
    const orgMember = await db.oneOrNone(
      `SELECT role FROM organization_member WHERE member_id = $(userId)`,
      { userId }
    );
    if (orgMember.role != Roles.ADMIN) {
      throw new Error("Only Admins can Create Project");
    }
    const deletedProjectId = await db.oneOrNone(
      `DELETE FROM project WHERE id = $(projectId) RETURNING id`,
      {projectId}
    );
    return deletedProjectId;
  } catch (err: any) {
    throw err;
  }
};

export const getProject = async (id: string) => {
  try {
    const project = await db.oneOrNone(
      `SELECT id,name,key FROM project WHERE id = $(id)`,
      { id }
    );
    return project;
  } catch (err: any) {
    throw err;
  }
};
