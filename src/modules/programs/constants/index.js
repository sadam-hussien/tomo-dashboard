import { programTypes } from "constants";

export const subMealsTitle = [
  "الوجبة الأولى",
  "الوجبة الثانية",
  "الوجبة الثالثة",
  "الوجبة الرابعة",
  "الوجبة الخامسة",
  "الوجبة السادسة",
  "الوجبة السابعة",
  "الوجبة الثامنة",
  "الوجبة التاسعة",
  "الوجبة العاشرة",
  "الوجبة الحادية عشرة",
  "الوجبة الثانية عشرة",
  "الوجبة الثالثة عشرة",
  "الوجبة الرابعة عشرة",
  "الوجبة الخامسة عشرة",
  "الوجبة السادسة عشرة",
  "الوجبة السابعة عشرة",
  "الوجبة الثامنة عشرة",
  "الوجبة التاسعة عشرة",
  "الوجبة العشرين",
];

export const subWorkOutTitle = [
  "التمرين الأول",
  "التمرين الثاني",
  "التمرين الثالث",
  "التمرين الرابع",
  "التمرين الخامس",
  "التمرين السادس",
  "التمرين السابع",
  "التمرين الثامن",
  "التمرين التاسع",
  "التمرين العاشرة",
  "التمرين الحادية عشر",
  "التمرين الثانية عشر",
  "التمرين الثالثة عشر",
  "التمرين الرابعة عشر",
  "التمرين الخامسة عشر",
  "التمرين السادسة عشر",
  "التمرين السابعة عشر",
  "التمرين الثامنة عشر",
  "التمرين التاسعة عشر",
  "التمرين العشرين",
];

export const meals = [
  {
    name: "الوجبة الاولى",
    extra: [
      {
        name: "الوجبة الاولى",
        details: "",
        calories: "",
        image: [],
      },
    ],
  },
  {
    name: "الوجبة الثانية",
    extra: [
      {
        name: "الوجبة الثانية",
        details: "",
        calories: "",
        image: [],
      },
    ],
  },
];

export const excersices = [
  {
    name: "التمرين الاول",
    details: "",
    tools: "",
    duration: "",
    reps: "",
    calories: "",
    images: [],
  },
  {
    name: "التمرين الثانى",
    details: "",
    tools: "",
    duration: "",
    reps: "",
    calories: "",
    images: [],
  },
];

export const defaultProgramType = programTypes.nutrition;

export const programTypeSports = programTypes.sports;

export const programTypePsychological = programTypes.psychological;

export const programTypeSupplements = programTypes.supplements;

export const programTypeOptions = [
  {
    label: "برنامج غذائى",
    value: programTypes.nutrition,
  },
  {
    label: "برنامج رياضى",
    value: programTypes.sports,
  },
  {
    label: "برنامج نفسى",
    value: programTypes.psychological,
  },
  {
    label: "مكملات",
    value: programTypes.supplements,
  },
];
