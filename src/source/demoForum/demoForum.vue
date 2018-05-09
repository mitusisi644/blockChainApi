<template>
  <el-card class="form" label-width="130px">
    <form-schema ref="formSchema" :schema="schemaAjax" v-model="model">
      <el-button type="primary" @click="submit">Subscribe</el-button>
      <el-button type="reset">Reset</el-button>
    </form-schema>
  </el-card>
</template>

<script>
  import FormSchema from 'vue-json-schema'
  import { Option } from 'element-ui'
  import schema from '@/schema/newsletter'
  import schemaFile from '@/schema/filedsSchema'
  FormSchema.setComponent('form', 'el-form', ({ vm }) => {
    const labelWidth = '120px'
    const model = vm.data
    const rules = {}
/* :model="participantFrom"
    vm.fields.forEach((field) => {
      const type = field.schemaType === 'array' && field.type === 'radio'
        ? 'string'
        : field.schemaType
      const required = field.required
      const message = field.title
      const trigger = ['radio', 'checkbox', 'select'].includes(field.type)
        ? 'change' : 'blur'

      // http://element.eleme.io/#/en-US/component/form#validation
      rules[field.name] = { type, required, message, trigger }
    })
*/
    return { labelWidth, rules, model }
  })

  FormSchema.setComponent('label', 'el-form-item', ({ field }) => ({
    prop: field.name
  }))
  FormSchema.setComponent('email', 'el-input')
  FormSchema.setComponent('text', 'el-input')
  FormSchema.setComponent('textarea', 'el-input')
  FormSchema.setComponent('checkbox', 'el-checkbox')
  FormSchema.setComponent('switch', 'el-switch')
  FormSchema.setComponent('radio', 'el-radio')
  FormSchema.setComponent('select', 'el-select')

  // You can also use the component object
  FormSchema.setComponent('option', Option)

  export default {
    data: () => ({
      schemaAjax:{},
      model: {}
    }),
    methods: {
      showDialog:function(){
        var formD = ["$class","agencyId","areaId"];
        initSchemaJson(formD);
      },
      submit (e) {
        // this.$refs.formSchema.form().validate((valid) => {
        //   if (valid) {
        //     this.$refs.formSchema.clearErrorMessage()
        //   } else {
        //     this.$refs.formSchema.setErrorMessage('Please fill out the required fields')
        //     return false
        //   }
        // })
      }
    },
    created: function () {
      var formD = ["$class","agencyId","areaId"];
      this.schemaAjax = initSchemaJson(formD);

    },
    components: { FormSchema }
  }
  function initSchemaJson(_json){
    var newSch = {};
    Object.keys(schemaFile).forEach(function(key){
      schemaFile[key]["title"] = key;

      if(Array.indexOf(_json,key) > -1){
        newSch[key] = schemaFile[key];
      }
    });
    var defaultJs = {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "type": "object",
          "title": "Newsletter Subscription",
          "description": "Sign up for free newsletters and get more delivered to your inbox",
          "properties": newSch,
          "additionalProperties": false,
          "required": []
      };
    return defaultJs;
  }
</script>

<style>

</style>
