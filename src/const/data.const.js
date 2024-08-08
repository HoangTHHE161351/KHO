export const ROLE = {
  ADMIN: 1,
  STAFF: 2,
  TEACHER: 3,
  STUDENT: 4,
};

export const ROLE_NAME = {
  [ROLE.ADMIN]: "ADMIN",
  [ROLE.STAFF]: "STAFF",
  [ROLE.TEACHER]: "TEACHER",
  [ROLE.STUDENT]: "STUDENT",
};

export const LIMIT_OPTION = [
  { value: 10, label: "10" },
  { value: 25, label: "25" },
  { value: 100, label: "100" },
];

export const PAGINATION_DEFAULT = {
  page: 1,
  size: LIMIT_OPTION[0].value,
};

export const STATUS_TYPE = {
  ACTIVE: "ACTIVE",
  DELETED: "DELETED",
  INACTIVE: "INACTIVE",
  PENDING_ACTIVATION: "PENDING_ACTIVATION",
  NOT_YET: "NOT YET",
  ATTEND: "ATTEND",
  ABSENT: "ABSENT",
}

export const STATUS_USER = [
  { id: STATUS_TYPE.ACTIVE, label: "Active" },
  { id: STATUS_TYPE.INACTIVE, label: 'Inactive' },
  { id: STATUS_TYPE.DELETED, label: 'Delete' }
]

export const GENDER_TYPE = {
  male: 1,
  female: 2,
};

export const GENDER_LIST = [
  { id: GENDER_TYPE.female, label: "Female" },
  { id: GENDER_TYPE.male, label: "Male" },
];

export const ROLE_LIST = [
  { id: ROLE_NAME[ROLE.STUDENT], label: "Student" },
  { id: ROLE_NAME[ROLE.TEACHER], label: "Teacher" },
  { id: ROLE_NAME[ROLE.STAFF], label: "Staff" },
];

export const BOOLEAN_TYPE = {
  true: 1,
  false: 0,
};
