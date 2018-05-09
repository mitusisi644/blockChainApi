<template>
  <el-card class="form">
    <form-schema ref="formSchema" :schema="schema" v-model="model">
      <el-button type="primary" @click="submit">Subscribe</el-button>
      <el-button type="reset">Reset</el-button>
    </form-schema>
  </el-card>

  <!--<el-form class="form" :model="participantFrom" label-width="80px">
    <form-schema ref="formSchemaAjax" :schema="schemaAjax" v-model="modelAjax">
      <el-button type="primary" @click="submit">que</el-button>
      <el-button type="reset">res</el-button>
    </form-schema>
  </el-form>-->

</template>

<script>
  import FormSchema from 'vue-json-schema'
  import { Option } from 'element-ui'
  import schemaJ from '@/schema/newsletter'

  FormSchema.setComponent('form', 'el-form', ({ vm }) => {
    // vm is the FormSchema VM

    const labelWidth = '120px'
    const model = vm.data
    const rules = {}
    /*
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
    // returning the form props
    return { labelWidth, rules, model }
  })

  // http://element.eleme.io/#/en-US/component/form#validation
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

  // By default `<h1/>` is used to render the form title.
  // To override this, use the `title` type:
  //FormSchema.setComponent('title', 'h2')

  // By default `<p/>` is used to render the form title.
  // To override this, use the `description` type:
  FormSchema.setComponent('description', 'small')

  // By default `<div/>` is used to render the message error.
  // To override this, use the `error` type:
  FormSchema.setComponent('error', 'el-alert', ({ vm }) => ({
    type: 'error',
    title: vm.error
  }))

  export default {
    data: () => ({
      participantFrom: {

      },
      schemaAjax: {},
      modelAjax: {},
      schema: schemaJ,
      model: {}
    }),
    methods: {
      submit (e) {
        // this.$refs.formSchema.form() returns the ElementUI's form instance

        this.$refs.formSchema.form().validate((valid) => {
          if (valid) {
            // this.model contains the valid data according your JSON Schema.
            // You can submit your model to the server here
            console.log(JSON.stringify(this.model))
            this.$refs.formSchema.clearErrorMessage()
          } else {
            this.$refs.formSchema.setErrorMessage('Please fill out the required fields')
            return false
          }
        })
      }
    },
    created: function () {
      this.schemaAjax = buildSchema(AxiosFileds)
    },
    components: { FormSchema }
  }

  function buildSchema(AjaxData){
    var proA = new Array();
    $.each(AjaxData,function (index,item) {
      proA[index] = {
        "type": "string",
        "title": index,
        "default": item.default,
        "description": item.description,
        "disabled": item.disabled,
        "attrs": {}
      };
    })
    var defaultJs = {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "Newsletter Subscription",
      "description": "Sign up for free newsletters and get more delivered to your inbox",
      "properties": proA,
      "additionalProperties": false,
      "required": []
    };
    return defaultJs;
  }
</script>

<style>

</style>
