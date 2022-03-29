const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const memberSchema = new Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  status: { type: String, required: true },
  notes: { type: String },
  lastUpdated: { type: String },
}, {timestamps: true});

memberSchema.pre("save", function(){
  this.lastUpdated = moment().format('DD/MM/YYYY');
})

memberSchema.methods.memberJSON = function(){
  return {
    name: this.name,
    company: this.company,
    status: this.status,
    notes: this.notes,
    lastUpdated: this.lastUpdated,
    id: this.id
  }
}

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;