GYMOS / IRONGYM DEMO SEED DATA
================================

Import each JSON file into its corresponding MongoDB collection using MongoDB Compass.

IMPORTANT:
1. There is NO separate Admin model in the current architecture.
   Admin is User.role = "admin".
2. I included an Admin User AND an Admin Member document because you asked for
   the admin to also exist in Member.
3. Each Trainer has:
   User(role="trainer") -> Trainer(user=<same user id>) -> Member(user=<same user id>)
4. Normal members are assigned to trainers through Member.trainer.
5. The 5 memberships/payments belong to the 5 normal members.
6. Payment Razorpay IDs are DEMO values. They are not real Razorpay transactions.
7. Image URLs are placeholders. Replace them with Cloudinary URLs if your frontend
   expects real images.
8. Demo password for all users: Password@123

Collections:
users.json
members.json
trainers.json
membershipplans.json
memberships.json
payments.json
machines.json
gallery.json
testimonials.json

Recommended import order:
1. users
2. trainers
3. members
4. membershipplans
5. memberships
6. payments
7. machines
8. gallery
9. testimonials

If your MongoDB database already has records, these IDs are intentionally
dummy IDs; import into a test/dev database to avoid conflicts.
