import db from "../libs/utils";
import { OrganizationSchema, OrgMemberSchema, Roles } from "../types";

export const createOrganization = async ({
  orgName,
  orgSlug,
  logo,
  userId,
}: OrganizationSchema) => {
  try {
    const role = Roles.ADMIN;
    const newOrg = await db.one(
      `INSERT INTO organizationss(name,slug,logo_url) VALUES($(orgName),$(orgSlug),$(logo)) RETURNING *`,
      { orgName, orgSlug, logo }
    );
    const organization_id = newOrg.id;
    if (!organization_id) {
      throw new Error(`Unable to insert organization`);
    }
    const orgMember: OrgMemberSchema = await db.one(
      `INSERT INTO organization_member(organization_id,member_id,role) VALUES ($(organization_id),$(userId),$(role)) RETURNING *`,
      { organization_id, userId, role }
    );
    return newOrg;
  } catch (err: any) {
    throw err;
  }
};

export const getOrganization = async ({
  orgId,
  userId,
}: {
  orgId: string;
  userId: string;
}) => {
  try {
    const organization = await db.one(
      `SELECT org.id,org.name,org.slug,org.logo_url,org_member.role FROM organizationss org INNER JOIN organization_member org_member ON org.id=org_member.organization_id WHERE org.id = $(orgId) AND org_member.member_id = $(userId)`,
      { orgId, userId }
    );
    return organization;
  } catch (err: any) {
    throw err;
  }
};

export const getAllOrganizationForUser = async (userId: string) => {
  try {
    const organizations = await db.manyOrNone(
      `SELECT org.id,org.name,org.slug,org.logo_url,org_member.role FROM organizationss org INNER JOIN organization_member org_member ON org.id=org_member.organization_id WHERE org_member.member_id = $(userId)`,
      { userId }
    );
    return organizations;
  } catch (err: any) {
    throw err;
  }
};

export const getOrganizationMembers = async (userId: string) => {
  try {
    const isOrgMember = await db.oneOrNone(
      `SELECT * FROM organization_member WHERE member_id = $1`,
      userId
    );
    const orgMembersUserId = await db.manyOrNone(
      `SELECT member_id FROM organization_member WHERE organization_id = $(organization_id)`,
      isOrgMember
    );
    const users = await db.manyOrNone(
      `SELECT * FROM users WHERE id IN ($(memberIds:csv))`,
      { memberIds: orgMembersUserId.map((member) => member.member_id) }
    );
    return users;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};
