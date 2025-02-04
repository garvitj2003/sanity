import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const accountSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    refresh_token: { type: String, set: encryptFunction },
    access_token: { type: String, set: encryptFunction },
    expires_at: Number,
    token_type: String,
    scope: String,
    id_token: String,
    session_state: String,

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// Ensure uniqueness for provider & providerAccountId
accountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

// Index userId for fast lookup
accountSchema.index({ userId: 1 });

const AccountModel = models.Account || model("Account", accountSchema);
export default AccountModel;
