const mongoose=require('mongoose');
const validator=require('validator');

const ProfileSchema=mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      handle:{
     type:String,
     required:[true,'Please enter handle for your profile'],
     unique:[true,'This handle is already used']
      },
      
      company: {
        type: String
      },
      website: {
        type: String,
        validate:[validator.isURL,'please enter proper url of website']
        
      },
      location: {
        type: String
      },
      status: {
        type: String,
        required: [true,'status is must require']
      },
      skills: {
        type: [String],
        required: [true,'enter your skill']
      },
      bio: {
        type: String
      },
      githubusername: {
        type: String
      },
      experience: [
        {
          title: {
            type: String,
            required: [true,'Title is required']
          },
          company: {
            type: String,
            required: [true,'please enter company name'] 
          },
          location: {
            type: String
          },
          from: {
            type: Date,
            required: [true,'Enter your starting date of working ']
          },
          to: {
            type: Date
          },
          current: {
            type: Boolean,
            default: false
          },
          discription: {
            type: String
          }
        }
      ],
      education: [
        {
          college: {
            type: String,
            required: [true,'Enter your school or college name']
          },
          degree: {
            type: String,
            required: [true,'Enter your degree']
          },
          fieldofstudy: {
            type: String,
            required: [true,'enter your feld of study']
          },
          from: {
            type: Date,
            required: [true,'enter your date when you start your study']
          },
          to: {
            type: Date
          },
          current: {
            type: Boolean,
            default: false
          },
          discription: {
            type: String
          }
        }
      ],
      social: {
        youtube: {
          type: String,
          validate:[validator.isURL,'please enter proper url of youtube']

        },
        twitter: {
          type: String,
          validate:[validator.isURL,'please enter proper url of twitter']
        },
        facebook: {
          type: String,
          validate:[validator.isURL,'please enter proper url of facebook']
        },
        linkedin: {
          type: String,
          validate:[validator.isURL,'please enter proper url of linkedin']
        },
        instagram: {
          type: String,
          validate:[validator.isURL,'please enter proper url of instagram']
        }
      },
      date: {
        type: Date,
        default: Date.now
      }
});

const Profile=mongoose.model('Profile',ProfileSchema);
module.exports=Profile;