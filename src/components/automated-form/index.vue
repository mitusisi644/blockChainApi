<template>
  <div class="formDialog">
    <el-card class="form-dialog-card" label-width="130px">
      <form-schema ref="formSchema" :schema="schemaAjax" v-model="model">
        <el-button class="lss-btn-next" type="primary" @click="aa()">确定</el-button>
        <el-button class="lss-btn-cancel" type="reset">取消</el-button>
      </form-schema>
    </el-card>
  </div>
</template>
<script>
  import FormSchema from 'vue-json-schema'
  import commintSchema from '@/schema/filedsSchema'
  export default {
    props: ["formData"],
    data () {
      return {
        schemaAjax: {},
        model: {}
      }
    },
    methods: {
      initSchemaJson1: function () {
        const newSch = {};
        const _this = this;
        const _thisJson = _this.formData;

        //循环处理字段参数
        Object.keys(_thisJson).map(function (item,index,input) {
          if(_thisJson[index] instanceof Object){
            Object.keys(_thisJson[index]).forEach(function(chiItem,chiIndex){
              newSch[chiItem] = commintSchema[chiItem];
              newSch[chiItem]['title'] = chiItem;
              Object.keys(_thisJson[index][chiItem]).map(function (cc,aa) {
                newSch[chiItem][cc] = _thisJson[index][chiItem][cc];
              })
            })
          }else{
            newSch[_thisJson[index]] = commintSchema[_thisJson[index]];
            newSch[_thisJson[index]]['title'] = _thisJson[index];
          }
        });
        //参考官方格式进行拼接
        const defaultJs = {
          "type": "object",
          "properties": newSch,
          "additionalProperties": true,
        };
        return defaultJs;
      },
      aa:function () {
        this.$emit("submitForm",this.model);
      }
    },
    mounted: function(){
     //$后执行的，，所以当schemaAjax初始到页面后才会执行代码的格式，所以initSchemaJson1方法 不能放在这
    },
    watch:{

    },
    created(){
      //初始表单字段数据
      this.schemaAjax = this.initSchemaJson1();
    },
    components : {
      //schema组件引用
      FormSchema
    }
  }
</script>
<style scoped>
  .formDialog {
    width: 100%;
    height: auto;
    text-align: left;
  }
  .el-card,form-dialog-card {
    box-shadow: none;
    -webkit-box-shadow: none;
    background:none;
    border-width: 0px;
    border:none;
   }
  .lss-btn-cancel,
  .lss-btn-next {
    float:right; margin-left:20px;
  }
</style>
