// Shared types for the onboarding wizard

export interface OnboardingData {
  countryCode: string;
  mobile: string;
  otpVerified: boolean;
  fullName: string;
  gender: 'male' | 'female' | '';
  dob: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  professions: string[];
  instagram: string;
  facebook: string;
  website: string;
}

export const INITIAL_DATA: OnboardingData = {
  countryCode: '+91',
  mobile: '',
  otpVerified: false,
  fullName: '',
  gender: '',
  dob: '',
  area: '',
  city: '',
  state: '',
  pincode: '',
  professions: [],
  instagram: '',
  facebook: '',
  website: '',
};

export const STEP_LABELS = [
  'Mobile Verification',
  'Personal Details',
  'Professional Details',
  'Social Links',
  'Review & Submit',
];
