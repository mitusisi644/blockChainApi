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
    <el-dialog title="机构新交易"
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
    <el-dialog title="新加机构"
      :visible.sync="newParticipant"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="handleClose">

      <el-form ref="form" :model="participantFrom" label-width="120px">
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
		//机构列表
        this.$axios(promiseBaseUrl+"Agency",{}, data => {
          this.tableData = data;
        })
      },
      showNewTransactionDialog: function(d){
		  //添加资产交易记录弹框
        this.createform.assetDBId = d.agencyId;
        this.createform.locDetailsClass = this.createform.locDetailsClass;
        this.createform.owner = d.$class+"#"+d.agencyId;
        this.newTransactionDialog = true;
      },
      showNewParticipant: function(d){
		  //添加机构弹框
        this.newParticipant = true;
      },
      delParticipant: function (d){
		  //删除机构记录
        var _this = this;
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.curlRequest(promiseBaseUrl+'Agency/'+d.agencyId,{},function(d){
            if(d.statusCode == 204){
              _this.successNotify('删除成功');
              _this.getAgency();
            }else{
              _this.errorNotify("删除"+d.agencyId+"的记录失败");
            }
          });
        }).catch(() => {
          //取消
        });
      },
      submitAddLocAsset: function (){
		  //添加资产交易记录接口
		var _this = this;
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
		  "options": {
			"$class": "org.zjhl.network.Options",
			"trim": "11",
			"interior": "11",
			"extras": []
		  },
          "owner": this.createform.owner,
          "locStatus": "SUBMITTED"
        };
        this.promiseAjax(promiseBaseUrl+'CreateLocAsset',where, function(resp){
          _this.successNotify('交易已生成');
        }).then(
          _this.newTransactionDialog = false
        );
      },
      submitAddParticipant:function () {
		  //添加机构接口
        var _this = this;
        this.promiseAjax(promiseBaseUrl+'Agency',this.participantFrom, function(resp){
          _this.successNotify('机构添加成功');
          _this.getAgency();
        }).then(
          _this.newParticipant = false
        );
      },
      handleClose: function () {
		 //初始化弹框输入框内容
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
</script>
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
