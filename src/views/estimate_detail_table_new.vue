<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-form label-width="70px">
					<el-form-item label="案件番号">
						<el-input v-model="form.order_id" disabled></el-input>
					</el-form-item>
					<el-form-item label="件名">
						<el-input v-model="form.subject_name"></el-input>
					</el-form-item>
					<el-form-item label="得意先">
						<el-input v-model="form.customer"></el-input>
					</el-form-item>
					<el-form-item label="見積日付">
						<el-date-picker v-model="form.estimate_date" type="date" size="normal"
							placeholder="日付選択"></el-date-picker>
					</el-form-item>
					<el-form-item label="見積期限">
						<el-date-picker v-model="form.estimate_deadline_date" type="date" size="normal"
							placeholder="日付選択"></el-date-picker>
					</el-form-item>
					<el-form-item label="支払条件">
						<el-input v-model="form.payment_terms"></el-input>
					</el-form-item>
					<el-form-item label="見積元">
						<el-input v-model="form.quotation_source"></el-input>
					</el-form-item>
					<el-form-item label="税率">
						<el-input v-model="form.tax"></el-input>
					</el-form-item>
					<el-form-item label="金額">
						<el-input v-model="form.amount"></el-input>
					</el-form-item>
					<el-form-item label="備考">
						<el-input v-model="form.info" type="textarea"></el-input>
					</el-form-item>
				</el-form>
				<el-button type="primary" :icon="Plus" @click="makeNewData('新規')">詳細新規</el-button>

			</div>
			<el-table :data="tableData.estimate_detail" border class="table" ref="multipleTable"
				header-cell-class-name="table-header">
				<el-table-column prop="product_name" label="品名" align="center"></el-table-column>
				<el-table-column prop="price" label="単価"></el-table-column>
				<el-table-column prop="quantity" label="数量"></el-table-column>
				<el-table-column prop="amount" label="金額"></el-table-column>
				<el-table-column prop="info" label="備考"></el-table-column>
				<el-table-column label="操作" width="290" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleEdit('編集',scope.$index, scope.row)" v-permiss="15">
							編集
						</el-button>
						<el-button text :icon="Delete" class="red" @click="handleDelete(scope.$index)" v-permiss="16">
							削除
						</el-button>
					</template>
				</el-table-column>
			</el-table>

			<el-button type="primary" @click="saveNewData()" style="margin-top: 10px;">登録</el-button>

		</div>

		<!-- 编辑｜新增弹出框 -->
		<!-- 編集｜新規ダイアログ -->
		<el-dialog :title="dialog_type" v-model="editVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="品名">
					<el-input v-model="detailDataLinked.product_name"></el-input>
				</el-form-item>
				<el-form-item label="単価">
					<el-input v-model="detailDataLinked.price"></el-input>
				</el-form-item>
				<el-form-item label="数量">
					<el-input v-model="detailDataLinked.quantity"></el-input>
				</el-form-item>
				<el-form-item label="金額">
					<el-input v-model="detailDataLinked.amount"></el-input>
				</el-form-item>
				<el-form-item label="備考">
					<el-input v-model="detailDataLinked.info"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">キャンセル</el-button>
					<el-button type="primary" v-if="dialog_type == '新規'" @click="saveDetail()">登録</el-button>
					<el-button type="primary" v-else @click="saveEdit()">登録</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Delete, Edit, Plus } from "@element-plus/icons-vue";
import { fetchOrderId } from "../api/index";
import { useRouter, useRoute } from 'vue-router';
import { de } from "element-plus/es/locale";

interface TableItem {
	order_id: string;
	subject_name: string;
	customer: string;
	estimate_date: string;
	estimate_deadline_date: string;
	payment_terms: string;
	quotation_source: string;
	tax: number;
	amount: number;
	info: string;
	estimate_detail: TableItemDetail[];
}

interface TableItemDetail {
	product_name: string;
	price: number;
	quantity: number;
	amount: number;
	info: string;
}

const route = useRoute();

const detailDataLinked = ref<TableItemDetail>({
	product_name: "",
	price: 0,
	quantity: 0,
	amount: 0,
	info: ""

});

let detailData: TableItemDetail = {
	product_name: "",
	price: 0,
	quantity: 0,
	amount: 0,
	info: ""
}

const tableData = ref<TableItem>(
	{
		order_id: "",
		subject_name: "",
		customer: "",
		estimate_date: "",
		estimate_deadline_date: "",
		payment_terms: "",
		quotation_source: "",
		tax: 0,
		amount: 0,
		info: "",
		estimate_detail: []
	}
);

// 获取表格数据
// データ獲得
const getData = () => {
	fetchOrderId().then((res) => {
		tableData.value.order_id = res.data.order_id;
	});
};
getData();

// 删除操作
// 削除
const handleDelete = (index: number) => {
	// 二次确认删除
	// 削除の二次確認
	ElMessageBox.confirm("本当に削除しますか？", "INFO", {
		type: "warning",
	})
		.then(() => {
			ElMessage.success("削除成功！");
			tableData.value.estimate_detail.splice(index, 1);
		})
		.catch(() => { });
};

const dialog_type = ref("")

// 表格编辑时弹窗和保存
// テーブル編集のウィンドウと保存
const editVisible = ref(false);
let form = reactive({
	order_id: "",
	subject_name: "",
	customer: "",
	estimate_date: "",
	estimate_deadline_date: "",
	payment_terms: "",
	quotation_source: "",
	tax: 0,
	amount: 0,
	info: "",
});

//編集ボタン押下処理
let idx: number = -1;
const handleEdit = (type: string, index: number, row: any) => {
	dialog_type.value = type;
	idx = index;
	detailDataLinked.value.amount = row.amount;
	detailDataLinked.value.info = row.info;
	detailDataLinked.value.price = row.price;
	detailDataLinked.value.product_name = row.product_name;
	detailDataLinked.value.quantity = row.quantity;
	editVisible.value = true;
};


//新規詳細保存
const saveDetail = () => {
	editVisible.value = false;
	tableData.value.estimate_detail.push(
		{
			product_name: detailDataLinked.value.product_name,
			price: detailDataLinked.value.price,
			quantity: detailDataLinked.value.quantity,
			amount: detailDataLinked.value.amount,
			info: detailDataLinked.value.info
		}
	);
	ElMessage.success(`詳細は保存しました。`);
};

//詳細編集保存
const saveEdit = () => {
	editVisible.value = false;
	tableData.value.estimate_detail[idx].amount = detailDataLinked.value.amount;
	tableData.value.estimate_detail[idx].info = detailDataLinked.value.info;
	tableData.value.estimate_detail[idx].price = detailDataLinked.value.price;
	tableData.value.estimate_detail[idx].product_name = detailDataLinked.value.product_name;
	tableData.value.estimate_detail[idx].quantity = detailDataLinked.value.quantity;
	ElMessage.success(`編集は保存しました。`);
};

// 增加新数据
// 新規追加
const makeNewData = (type: string) => {
	dialog_type.value = type;
	detailDataLinked.value.amount = 0;
	detailDataLinked.value.info = "";
	detailDataLinked.value.price = 0;
	detailDataLinked.value.product_name = "";
	detailDataLinked.value.quantity = 0;
	editVisible.value = true;
};



//新規データ保存
//to_do:バックエンドにデータを送る
const saveNewData = () => {
	ElMessage.success(`新規データ保存しました。`);
};
</script>

<style scoped>
.handle-box {
	margin-bottom: 10px;
}

.handle-input {
	width: 200px;
}

.table {
	width: 100%;
	font-size: 14px;
}

.red {
	color: #ff0000;
}

.mr10 {
	margin-right: 10px;
}

.pagination_top {
	float: right;
	margin-bottom: 20px;
}
</style>
