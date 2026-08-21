// TEMPORARY ORGANOGRAM ROLE PLACEHOLDERS
// Replace these roles with client-confirmed roles when provided.

export const teamData = {
  id: 'root',
  name: 'Sana-Ullah',
  role: 'Chairman/CEO',
  children: [
    {
      id: 'node-1',
      name: 'Saeed ur Rehman',
      role: 'Director',
      children: [
        {
          id: 'placeholder-operations-manager',
          role: 'Operations Manager',
          children: [
            {
              id: 'placeholder-operations-officer',
              role: 'Operations Officer',
              children: [],
            },
            {
              id: 'placeholder-warehouse-supervisor',
              role: 'Warehouse Supervisor',
              children: [
                {
                  id: 'placeholder-dispatch-coordinator',
                  role: 'Dispatch Coordinator',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 'placeholder-procurement-supply-chain-manager',
          role: 'Procurement & Supply Chain Manager',
          children: [
            {
              id: 'placeholder-procurement-officer',
              role: 'Procurement Officer',
              children: [],
            },
          ],
        },
        {
          id: 'placeholder-quality-control-manager',
          role: 'Quality Control Manager',
          children: [
            {
              id: 'placeholder-quality-officer',
              role: 'Quality Officer',
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 'node-3',
      name: 'Mujeeb',
      role: 'Director',
      children: [
        {
          id: 'placeholder-sales-marketing-manager',
          role: 'Sales & Marketing Manager',
          children: [
            {
              id: 'placeholder-sales-officer',
              role: 'Sales Officer',
              children: [],
            },
          ],
        },
        {
          id: 'placeholder-finance-accounts-manager',
          role: 'Finance & Accounts Manager',
          children: [
            {
              id: 'placeholder-accounts-officer',
              role: 'Accounts Officer',
              children: [],
            },
          ],
        },
        {
          id: 'placeholder-hr-administration-manager',
          role: 'HR & Administration Manager',
          children: [
            {
              id: 'placeholder-administrative-officer',
              role: 'Administrative Officer',
              children: [],
            },
          ],
        },
      ],
    },
  ],
};
