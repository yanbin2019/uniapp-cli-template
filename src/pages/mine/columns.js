export const formSchema = {
  schema: [
    {
      fieId: 'name',
      label: '姓名',
      component: 'Input',
      rule: true,
    },
    {
      fieId: 'age1',
      label: '年龄',
      component: 'Select',
      rule: true,
      componentProps: {
        options: [
          { dictLabel: '18', dictValue: '18' },
          { dictLabel: '17', dictValue: '17' },
          {dictLabel:'11',dictValue:'11'}
        ]
      }
    },
     {
      fieId: 'time',
      label: '时间',
      component: 'Datetime',
      rule: true,
    },
     {
      fieId: 'img',
      label: '图片上传',
      component: 'ImgUpload',
      rule: true,
    },
    
     {
      fieId: 'desc',
      label: '备注',
      component: 'Textarea',
    }
  ],
  rules:{}
}