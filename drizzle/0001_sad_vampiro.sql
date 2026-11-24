CREATE TABLE "pets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(150) NOT NULL,
	"ownerId" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pets" ADD CONSTRAINT "pets_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;