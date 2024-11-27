import { post, get, put } from "../../lib/network";
import { GetIssue, Issue, Sprint, UserType } from "../../types";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const createNewProject = async (project: any) => {
  try {
    const token = localStorage.getItem("token");
    const data = await post(`${BACKEND_URL}/api/v1/project`, project, {
      headers: { Authorization: token! },
    });
    return [data, null] as [any, null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};

export const createNewSprint = async (sprint: any) => {
  try {
    const token = localStorage.getItem("token");
    const data = await post(`${BACKEND_URL}/api/v1/sprint`, sprint, {
      headers: { Authorization: token! },
    });
    return [data, null] as [any, null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};

export const getProjectapi = async (projectId: string) => {
  try {
    const token = localStorage.getItem("token");
    const data = await get(`${BACKEND_URL}/api/v1/project/${projectId}`, {
      headers: { Authorization: token! },
    });
    return [data, null] as [any, null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};

export const getAllSprints = async (projectId: string) => {
  try {
    const token = localStorage.getItem("token");
    const data = await get(`${BACKEND_URL}/api/v1/sprint/${projectId}`, {
      headers: { Authorization: token! },
    });
    return [data, null] as [Sprint[], null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};

export const updateSprintStatus = async (sprint: Sprint) => {
  try {
    const token = localStorage.getItem("token");
    const data = await put(`${BACKEND_URL}/api/v1/sprint`, sprint, {
      headers: { Authorization: token! },
    });
    return [data, null] as [Sprint, null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};

export const getOrganizationMembers = async () => {
  try {
    const token = localStorage.getItem("token");
    const data = await get(`${BACKEND_URL}/api/v1/organizations/org/all`, {
      headers: { Authorization: token! },
    });
    return [data, null] as [UserType[], null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};

export const createIssue = async (issue: Issue) => {
  try {
    const token = localStorage.getItem("token");
    const data = await post(`${BACKEND_URL}/api/v1/issues`, issue, {
      headers: { Authorization: token! },
    });
    return [data, null] as [Issue, null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};

export const getAllIssue = async (sprintId: string) => {
  try {
    const token = localStorage.getItem("token");
    const data = await get(`${BACKEND_URL}/api/v1/issues/${sprintId}`, {
      headers: { Authorization: token! },
    });
    return [data, null] as [GetIssue[], null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};

export const updateIssue = async (updatedIssues: GetIssue[]) => {
  try {
    const token = localStorage.getItem("token");
    const data = await put(`${BACKEND_URL}/api/v1/issues/`, updatedIssues, {
      headers: { Authorization: token! },
    });
    return [data, null] as [any, null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};
