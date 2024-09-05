export const URL = {
  auth: 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/login',
  grid_get: 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/get',
  grid_post: 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/create',
};

export const URL_WITH_ID = (id: string) => {
  return {
    grid_delete: `https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
    grid_edit: `https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/set/${id}`
  }
}