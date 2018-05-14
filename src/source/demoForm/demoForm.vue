<template>
  <div>
    <h2>芳华一生</h2>
    <AutomatedForm :formData="formData" @submitForm="onSubmitForm"></AutomatedForm>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: [{"$class":{"disabled":true}},"agencyId","areaId","countryId","companyName"],
      }
    },
    methods: {
      onSubmitForm: function(d){
        this.successNotify('芳华成功');
      }
    },
    created: function () {
    }
  };
</script>
<style>
</style>
