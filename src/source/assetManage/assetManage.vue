<template>
  <div class="asset-warp">
    <div class="table-warp">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="$class" width="200" align="center" label="classKey"> </el-table-column>
        <el-table-column prop="assetDBId" width="100" align="center" label="assetDBId"> </el-table-column>
        <el-table-column prop="locDetails" width="100" align="center" label="locDetails" type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <div class="lss-childs-item">
                <span style="float: left;"><strong>$class:</strong>{{props.row.locDetails.$class}}</span>
                <span style="float: right;"><strong>locNo:</strong>{{ props.row.locDetails.locNo }}</span>
              </div>
              <div class="lss-childs-item">
                <span style="float: left;"><strong>openSwift:</strong>{{props.row.locDetails.openSwift}}</span>
                <span style="float: right;"><strong>accepttingSwift:</strong>{{ props.row.locDetails.accepttingSwift }}</span>
              </div>
              <div class="lss-childs-item">
                <span style="float: left;"><strong>amount:</strong>{{props.row.locDetails.amount}}</span>
                <span style="float: right;"><strong>currency:</strong>{{ props.row.locDetails.currency }}</span>
              </div>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="owner" align="center" label="owner"> </el-table-column>
        <el-table-column width="110" prop="locStatus" align="center" label="locStatus"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateDialogForm(scope.row)">modify state</el-button>
            <!--<el-button
              size="mini"
              @click="statusReco(scope.row)">Del</el-button>-->
            <el-button
              size="mini"
              @click="delLocAsset(scope.row)">Del</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--芳华之新锐-->
    <el-dialog title="芳华之新锐" class="dialog-form-warp"
               :visible.sync="updateStatusVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :before-close="handleClose">
      <el-form :model="updateFrom">
        <el-form-item label="$class" label-width="120px">
          <el-input disabled v-model="updateFrom.classK" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="locAsset" label-width="120px">
          <el-input disabled v-model="updateFrom.locAsset" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="owner" label-width="120px">
          <el-input disabled v-model="updateFrom.owner" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="newLocStatus" label-width="120px">
          <el-select v-model="updateFrom.statusVal" placeholder="请选择">
            <el-option v-for="(item,index) in updateFrom.statusTextes" :label="index" :value="index" :disabled="!item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateStatusVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdateLocAsset()">确 定</el-button>
      </div>
    </el-dialog>

    <!--芳华之进城-->
    <el-dialog title="芳华之进城" class="dialog-form-warp" width="90%"
               :visible.sync="statusRecoVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :before-close="handleClose">
      <div class="lss-steps-warp">
        <el-steps :active="activeSteps"  direction="vertical">
          <div v-for="(item,index) in statusFrom.statusTextes">
            <el-step :title="index" description="1212">{{item}}}</el-step>
          </div>
        </el-steps>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        updateFrom: {
          classK: "org.zjhl.network.UpdateLocAsset",
          locAsset: "resource:org.zjhl.network.LocAsset#",
          owner: "",
          statusVal: "",
          statusTextes: [],
          statusValIndex: 1
        },
        statusFrom: {
          statusTextes: [],
          statusValIndex: 1
        },
        updateStatusVisible: false,
        statusRecoVisible: false,
        tableData: [],
        statusText: {"SUBMITTED": true, "APPROVIED": true, "CONFIRMED": true, "SETTLED": true},
        activeSteps: 0
      }
    },
    methods: {
      getLocAssetData: function () {
		var _this = this;
        this.handleClose();
        this.$axios(promiseBaseUrl+'LocAsset', {}, data => {
          _this.tableData = data;
        })
      },
      updateDialogForm: function (d) {
        var _this = this;
		this.updateFrom.locAsset = this.updateFrom.locAsset + d.assetDBId;
        this.updateFrom.owner = d.owner;
        this.updateFrom.statusVal = d.locStatus;
        this.updateStatusVisible = true;
        this.updateFrom.statusTextes = this.statusText;
        var i = 1;
        for (var j in this.updateFrom.statusTextes) {
          if (j == d.locStatus) {
            _this.updateFrom.statusValIndex = i;
            _this.updateFrom.statusTextes[j] = true;
            return;
          } else {
            _this.updateFrom.statusTextes[j] = false;
          }
          i++;
        }
      },
      delLocAsset: function (d) {
        var _this = this;
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.curlRequest(promiseBaseUrl+'LocAsset/' + d.assetDBId, {}, function (d) {
            if (d.statusCode == 204) {
              _this.successNotify('删除成功');
              _this.getLocAssetData()
            }
          });
        }).catch(() => {
          //已取消
        });
      },
      statusReco: function (d){
        var _this = this;
        this.statusRecoVisible = true;
        this.activeSteps = this.statusFrom.statusValIndex;
        this.statusFrom.statusTextes = this.statusText;
        var i = 1;
        for (var j in this.statusFrom.statusTextes) {
          if (j == d.locStatus) {
            _this.statusFrom.statusValIndex = i;
            _this.statusFrom.statusTextes[j] = true;
			return;
          } else {
            _this.statusFrom.statusTextes[j] = false;
          }
          i++;
        }
      },
      submitUpdateLocAsset: function () {
        var _this = this;
        var where = {
          "$class": this.updateFrom.classK,
          "locAsset": this.updateFrom.locAsset,
          "owner": this.updateFrom.owner,
          "newLocStatus": this.updateFrom.statusVal,
        }
        this.promiseAjax(promiseBaseUrl+'UpdateLocAsset', where, function (resp) {
          _this.successNotify("更新成功");
          _this.getLocAssetData();
		  return;
        }).then(
          _this.updateStatusVisible = false
        );
      },
      handleClose: function () {
        this.updateFrom = {
          classK: "org.zjhl.network.UpdateLocAsset",
            locAsset: "resource:org.zjhl.network.LocAsset#",
            owner: "",
            statusVal: "",
            statusTextes: [],
            statusValIndex: 1
        };
        this.statusRecoVisible = false;
        this.updateStatusVisible = false;
      }
    },
    created: function () {
      this.getLocAssetData()
    }
  };

  /*function successCreate(msg){
    vm.$notify({
      title: '提示',
      message: msg,
      duration: 0,
      type: 'success'
    });
  }
  function promiseAjax(url, data, callback) {
    var p = new Promise(function (resolve, reject) {
      $.ajax({
        url: url,
        type: data == null ? 'GET' : 'POST',
        dataType: "json",
        data: data == null ? '' : JSON.stringify(data),
        async: true,
        contentType: "application/json",
        success: function (resp) {
          callback(resp);
          resolve();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          if (XMLHttpRequest.status == "401") {
            alert(XMLHttpRequest.status);
          } else {
            alert(XMLHttpRequest.responseText);
          }
          reject();
        }
      });
    });
    return p;
  }
*/
</script>

<style scoped>
  .lss-childs-item {
    width:100%;
    height: auto;
    overflow: hidden;
  }
  .lss-childs-item span {
    font-size: 14px;
    font-weight: 100;
    padding:5px 0px;
  }
  .lss-childs-item span strong {
    padding-right:5px;
  }
  .lss-steps-warp {
    width: 100%;
    height: 100%;
    text-align: left;
  }
  .lss-steps-warp * {
    margin: 0px;
  }
  .table-warp {
    width:100%; height:auto;
    overflow: hidden;
    margin-top:10px;
  }
  .new-transaction-btn {
    float: right;
  }
</style>
