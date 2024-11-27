import db from "../libs/utils";
import { GetIssue } from "../types";

interface Issue {
  id?: string;
  title: string;
  description: string;
  status: string;
  order?: number;
  priority: string;
  asignee_id: string;
  reporter_id?: string;
  project_id: string;
  sprint_id: string;
}

export const createIssue = async (issue: Issue) => {
  try {
    const {
      asignee_id,
      description,
      order,
      priority,
      project_id,
      sprint_id,
      status,
      title,
      reporter_id,
    } = issue;
    const lastIssue = await db.oneOrNone(
      `SELECT * FROM issue WHERE project_id = $(project_id) AND status = $(status) ORDER BY "order" DESC LIMIT 1`,
      { project_id, status }
    );
    const newOrder = lastIssue ? lastIssue.order + 1 : 0;
    const newIssue = await db.oneOrNone(
      `INSERT INTO issue(title,description,project_id,status,"order",priority,asignee_id,reporter_id,sprint_id) VALUES($(title),$(description),$(project_id),$(status),$(newOrder),$(priority),$(asignee_id),$(reporter_id),$(sprint_id)) RETURNING *`,
      {
        title,
        description,
        project_id,
        status,
        newOrder,
        priority,
        asignee_id,
        reporter_id,
        sprint_id,
      }
    );
    return newIssue;
  } catch (err: any) {
    throw err;
  }
};

export const getAllIssues = async (payload: {
  sprint_id: string;
  userId: string;
}) => {
  try {
    const { sprint_id, userId } = payload;
    const isOrgMember: any = await db.oneOrNone(
      `SELECT * FROM organization_member WHERE member_id= $1`,
      userId
    );
    if (!isOrgMember.id) {
      throw new Error("Only organization Members can fetch Issues");
    }
    const issues = await db.manyOrNone(
      `SELECT i.*, asignee.image_url AS asignee_imageUrl , asignee.email AS asignee_email , asignee.name AS asignee_name , reporter.image_url AS reporter_imageUrl , reporter.email AS reporter_email , reporter.name AS reporter_name FROM issue i INNER JOIN users asignee ON asignee.id=i.asignee_id INNER JOIN users reporter ON reporter.id = i.reporter_id WHERE i.sprint_id = $1`,
      sprint_id
    );
    return issues;
  } catch (err: any) {
    throw err;
  }
};

export const updateIssues = async (payload: {
  issues: GetIssue[];
  userId: string;
}) => {
  try {
    const { issues, userId } = payload;
    const isOrgMember: any = await db.oneOrNone(
      `SELECT * FROM organization_member WHERE member_id= $1`,
      userId
    );
    if (!isOrgMember.id) {
      throw new Error("Only organization Members can update Issues");
    }
    await db.none(`BEGIN`);
    for (const issue of issues) {
      const { status, order, id } = issue;
      await db.none(
        `UPDATE issue SET status = $(status) , "order" = $(order) WHERE id = $(id)`,
        { status, order, id }
      );
    }
    await db.none(`COMMIT`);
    return { success: true };
  } catch (err: any) {
    await db.none(`ROLLBACK`);
    throw err;
  }
};
