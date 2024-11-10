-- migrate:up

ALTER TABLE sprint
ADD CONSTRAINT project_id_fkey
FOREIGN KEY (project_id)
REFERENCES project(id);

ALTER TABLE issue
ADD CONSTRAINT project_id_fkey
FOREIGN KEY (project_id)
REFERENCES project(id);

ALTER TABLE issue
ADD CONSTRAINT sprint_id_fkey
FOREIGN KEY (sprint_id)
REFERENCES sprint(id)
ON DELETE SET NULL;

ALTER TABLE issue
ADD CONSTRAINT asignee_id_fkey
FOREIGN KEY (asignee_id)
REFERENCES users(id);

ALTER TABLE issue
ADD CONSTRAINT reporter_id_fkey
FOREIGN KEY (reporter_id)
REFERENCES users(id);


-- migrate:down


ALTER TABLE issue
DROP CONSTRAINT reporter_id_fkey;

ALTER TABLE issue
DROP CONSTRAINT asignee_id_fkey;

ALTER TABLE issue
DROP CONSTRAINT sprint_id_fkey;

ALTER TABLE issue
DROP CONSTRAINT project_id_fkey;

ALTER TABLE sprint
DROP CONSTRAINT project_id_fkey;

