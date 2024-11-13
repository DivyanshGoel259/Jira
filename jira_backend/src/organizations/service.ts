import db from "../libs/utils";
import { OrganizationSchema, OrgMemberSchema, Roles } from "../types";

export const createOrganization = async ({orgName,orgSlug,logo,userId}:OrganizationSchema)=>{
    try{
        const role = Roles.ADMIN
        const newOrg= await db.one(`
            INSERT INTO organizationss(name,slug,logo) VALUES($(orgName),$(orgSlug),$(logo)) RETURNING *`,{orgName,orgSlug,logo})
            const organization_id = newOrg.id
            if(!organization_id){
                throw new Error(`Unable to insert organization`)
            }
            const orgMember:OrgMemberSchema = await db.one(`
            INSERT INTO organization_member(organization_id,member_id,role) VALUES ($(organization_id),$(userId),$(role)) RETURNING *`,{organization_id,userId,role})
            return {newOrg,orgMember}
    } catch(err:any){
        throw err;
    }
}