<template>
  <div class="index-warp">
    <div class="top-tool" align="right">
        <el-button class="el-icon-plus" @click="showNewParticipant()">add</el-button>
    </div>
    <div class="table-warp">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="$class" align="center" label="classKey"> </el-table-column>
        <el-table-column prop="agencyId" align="center" label="agencyId"> </el-table-column>
        <el-table-column prop="areaId" align="center" label="areaId"> </el-table-column>
        <el-table-column prop="countryId" align="center" label="countryId"> </el-table-column>
        <el-table-column prop="companyName" align="center" label="companyName"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button class="new-transaction-btn" @click="showNewTransactionDialog(scope.row)" size="small">新交易</el-button>
            <el-button class="new-transaction-btn" @click="delParticipant(scope.row)" size="small">Del</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--芳华之黄金花-->
    <el-dialog title="芳华之黄金花"
               :visible.sync="newTransactionDialog"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :before-close="handleClose">
      <el-form :model="createform">
        <el-form-item label="$class" label-width="80px">
          <el-input disabled v-model="createform.$class"></el-input>
        </el-form-item>
        <el-form-item label="assetDBId" label-width="80px">
          <el-input style="width: 55%" disabled v-model="createform.assetDBId"></el-input>
          <el-input style="width: 44%"  v-model="createform.assetDBIdNum"></el-input>
        </el-form-item>
        <el-form-item label="owner" label-width="80px">
          <el-input disabled v-model="createform.owner"></el-input>
        </el-form-item>
        <fieldset class="form-dia-warp">
          <legend>locDetails:</legend>
          <el-form-item label="$class" label-width="110px">
            <el-input disabled v-model="createform.locDetailsClass"></el-input>
          </el-form-item>
          <el-form-item label="locNo" label-width="110px">
            <el-input v-model="createform.locNo"></el-input>
          </el-form-item>
          <el-form-item label="openSwift" label-width="110px">
            <el-input v-model="createform.openSwift"></el-input>
          </el-form-item>
          <el-form-item label="accepttingSwift" label-width="110px">
            <el-input v-model="createform.accepttingSwift"></el-input>
          </el-form-item>
          <el-form-item label="amount" label-width="110px">
            <el-input v-model="createform.amount"></el-input>
          </el-form-item>
          <el-form-item label="currency" label-width="110px">
            <el-input v-model="createform.currency"></el-input>
          </el-form-item>
        </fieldset>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newTransactionDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitAddLocAsset()">确 定</el-button>
      </div>
    </el-dialog>

    <!--芳华之大通-->
    <el-dialog title="芳华之大通"
      :visible.sync="newParticipant"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="handleClose">

      <el-form ref="form" :model="participantFrom" label-width="80px">
        <el-form-item label="$class">
          <el-input disabled v-model="participantFrom.$class"></el-input>
        </el-form-item>
        <el-form-item label="agencyId">
          <el-input v-model="participantFrom.agencyId"></el-input>
        </el-form-item>
        <el-form-item label="areaId">
          <el-input v-model="participantFrom.areaId"></el-input>
        </el-form-item>
        <el-form-item label="countryId">
          <el-input v-model="participantFrom.countryId"></el-input>
        </el-form-item>
        <el-form-item label="companyName">
          <el-input v-model="participantFrom.companyName"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="newParticipant = false">取 消</el-button>
        <el-button type="primary" @click="submitAddParticipant()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  let loadingInstance;
  export default {
    name: 'Index',
    data () {
      return {
        createform:{
          $class:"org.zjhl.network.CreateLocAsset",
          assetDBId:"",
          locDetailsClass:"org.zjhl.network.LetterOfCreditDetails",
          locNo:"",
          openSwift:"",
          accepttingSwift:"",
          amount:"",
          currency:"",
          owner:"",
          assetDBIdNum:""
        },
        participantFrom:{
          $class:"org.zjhl.network.Agency",
          agencyId:"",
          countryId:"",
          areaId:"",
          companyName:""
        },
        newTransactionDialog:false,
        newParticipant:false,
        tableData: []
      }
    },
    methods: {
      getAgency : function () {
        this.$axios(promiseBaseUrl+"Agency",{}, data => {
          this.tableData = data;
        })
      },
      showNewTransactionDialog: function(d){
        this.createform.assetDBId = d.agencyId;
        this.createform.locDetailsClass = this.createform.locDetailsClass;
        this.createform.owner = d.$class+"#"+d.agencyId;
        this.newTransactionDialog = true;
      },
      showNewParticipant: function(d){
        this.newParticipant = true;
      },
      delParticipant: function (d){
        var _this = this;
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.curlRequest(promiseBaseUrl+'Agency/'+d.agencyId,{},function(d){
            if(d.statusCode == 204){
              successCreate('删除成功');
              _this.getAgency()
            }
          });
        }).catch(() => {
          //alert('已取消')
        });
      },
      promiseSuccess(){
        this.$notify({
          title: '操作成功',
          message: '稍后查看资产交易记录'
        });
      },
      open() {
        const h = this.$createElement;

        this.$notify({
          title: '标题名称',
          message: h('i', { style: 'color: teal'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
        });
      },
      promiseAjax(url, data, callback) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
          $.ajax({
            url: url,
            type: data == null ? 'GET' : 'POST',
            dataType: "json",
            data: data == null ? '' : JSON.stringify(data),
            async: true,
            contentType: "application/json",
            beforeSend: function (){
              _this.$loading({"background":"rgba(0, 0, 0, 0.8)"});
            },
            success: function (resp) {
              callback(resp);
              resolve();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              errorCreate(XMLHttpRequest.status+" : "+XMLHttpRequest.responseText)
              reject();
            }
          });
        });
        return p;
      },
      curlRequest: function (urlPath,param,callbackFun){
        this.$loading({"background":"rgba(0, 0, 0, 0.8)"});
        const https = require('https');
        const options = {
          path: urlPath,
          method: 'DELETE'
        };
        const req = https.request(options, (res) => {
          callbackFun(res);
        });
        req.on('error', (e) => {
        });
        req.end();
      },
      submitAddLocAsset: function (){
        var where = {
          "$class": this.createform.$class,
          "assetDBId": this.createform.assetDBId+this.createform.assetDBIdNum,
          "locDetails": {
            "$class": this.createform.locDetailsClass,
            "locNo": this.createform.locNo,
            "openSwift": this.createform.openSwift,
            "accepttingSwift": this.createform.accepttingSwift,
            "amount": this.createform.amount,
            "currency": this.createform.currency,
            "id": 1
          },
          "owner": this.createform.owner,
          "locStatus": "SUBMITTED"
        };
        this.promiseAjax(promiseBaseUrl+'CreateLocAsset',where, function(resp){
          successCreate('交易已生成')
        }).then(
          this.newTransactionDialog = false
        );
      },
      submitAddParticipant:function () {
        var _this = this;
        this.promiseAjax(promiseBaseUrl+'Agency',this.participantFrom, function(resp){
          successCreate('机构添加成功');
          _this.getAgency();
        }).then(
          this.newParticipant = false
        );
      },
      handleClose: function () {
        this.createform = {
          $class:"org.zjhl.network.CreateLocAsset",
            assetDBId:"",
            locDetailsClass:"org.zjhl.network.LetterOfCreditDetails",
            locNo:"",
            openSwift:"",
            accepttingSwift:"",
            amount:"",
            currency:"",
            owner:""
        },
        this.participantFrom = {
          $class:"org.zjhl.network.Agency",
            agencyId:"",
            countryId:"",
            areaId:"",
            companyName:""
        },
        this.newParticipant = false;
        this.newTransactionDialog = false;
      }
    },
    created: function(){
      this.getAgency()
    }
  }
  function successCreate(msg){
    vm.$notify({
      title: '提示',
      message: msg,
      duration: 0,
      type: 'success'
    });
    vm.$loading.close();
  }
  function errorCreate(msg){
    vm.$notify({
      title: '提示',
      message: msg,
      duration: 0,
      type: 'error'
    });
    vm.$loading.closeAll();
  }
</script>
<!--

        /*var request = require('request');
        request.DELETE(
          {
            url:urlPath,
            form:param,
            encoding:'utf8',
            method:DELETE,
            headers: {
              'Content-Type': 'application/json'
            }
          },
          function(error, response, body){
            alert(11)
            if(response.statusCode == 200){
              console.log(body);
            }else{
              console.log(response.statusCode,165);
            }
          }
        )*/-->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .top-tool {
    padding-bottom:10px;
  }
  .form-dia-warp {
    width: 100%;
    height: auto;
    padding:10px;
    box-sizing: border-box;
  }
</style>
