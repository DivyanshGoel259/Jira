-- migrate:up

ALTER TABLE project
ADD CONSTRAINT organization_id_fkey
FOREIGN KEY (organization_id)
REFERENCES organizationss(id);

ALTER TABLE organization_member
ADD CONSTRAINT org_id_fkey
FOREIGN KEY (organization_id)
REFERENCES organizationss(id);

ALTER TABLE organization_member
ADD CONSTRAINT organization_member_id_fkey
FOREIGN KEY (member_id)
REFERENCES users(id);

-- migrate:down


ALTER TABLE project
DROP CONSTRAINT organization_id_fkey;

ALTER TABLE organization_member
DROP CONSTRAINT organization_member_id_fkey;

ALTER TABLE organization_member
DROP CONSTRAINT org_id_fkey;