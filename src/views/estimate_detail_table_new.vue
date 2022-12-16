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
						<el-button text :icon="Edit" @click="handleEdit('編集', scope.$index, scope.row)" v-permiss="15">
							編集
						</el-button>
						<el-button text :icon="Delete" class="red" @click="handleDelete(scope.$index)" v-permiss="16">
							削除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 编辑｜新增弹出框 -->
		<!-- 編集｜新規ダイアログ -->
		<el-dialog :title="dialog_type" v-model="editVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="品名">
					<el-input v-model="detailData.product_name"></el-input>
				</el-form-item>
				<el-form-item label="単価">
					<el-input v-model="detailData.price"></el-input>
				</el-form-item>
				<el-form-item label="数量">
					<el-input v-model="detailData.quantity"></el-input>
				</el-form-item>
				<el-form-item label="金額">
					<el-input v-model="detailData.amount"></el-input>
				</el-form-item>
				<el-form-item label="備考">
					<el-input v-model="detailData.info"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">キャンセル</el-button>
					<el-button type="primary"  @click="saveDetail()">登録</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Delete, Edit } from "@element-plus/icons-vue";
import { fetchOrderId } from "../api/index";
import { useRouter, useRoute } from 'vue-router';

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

const detailData = ref<TableItemDetail>(
	{
		product_name: "",
		price: 0,
		quantity: 0,
		amount: 0,
		info: ""
	}
)
const tableData = ref<TableItem>({
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
	estimate_detail: [
		{
			product_name: "",
			price: 0,
			quantity: 0,
			amount: 0,
			info: ""
		}
	]
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
			tableData.value.splice(index, 1);
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

let idx: number = -1;
const handleEdit = (type: string, index: number, row: any) => {
	dialog_type.value = type
	idx = index;
	form.order_id = row.order_id;
	form.subject_name = row.subject_name;
	form.customer = row.customer;
	form.estimate_date = row.estimate_date;
	form.estimate_deadline_date = row.estimate_deadline_date;
	form.payment_terms = row.payment_terms;
	form.quotation_source = row.quotation_source;
	form.tax = row.tax;
	form.amount = row.amount;
	form.info = row.info;
	editVisible.value = true;
};

const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`第 ${idx + 1} 行目修正成功`);
	tableData.value[idx].order_id = form.order_id;
	tableData.value[idx].subject_name = form.subject_name;
	tableData.value[idx].customer = form.customer;
	tableData.value[idx].estimate_date = form.estimate_date;
	tableData.value[idx].estimate_deadline_date = form.estimate_deadline_date;
	tableData.value[idx].payment_terms = form.payment_terms;
	tableData.value[idx].order_id = form.order_id;
	tableData.value[idx].subject_name = form.subject_name;
	tableData.value[idx].quotation_source = form.quotation_source;
	tableData.value[idx].tax = form.tax;
	tableData.value[idx].amount = form.amount;
	tableData.value[idx].info = form.info;
};

// 增加新数据
// 新規追加
const makeNewData = (type: string) => {
	dialog_type.value = type
	form.order_id = "10009"; //バックエンドから取る予定
	form.subject_name = "";
	form.customer = "";
	form.estimate_date = "";
	form.estimate_deadline_date = "";
	form.payment_terms = "";
	form.quotation_source = "";
	form.tax = 0;
	form.amount = 0;
	form.info = "";

	editVisible.value = true;
}

//新規データ保存
//to_do:バックエンドにデータを送る
const saveNewData = () => {
	editVisible.value = false;
	tableData.value.unshift(
		{
			order_id: form.order_id,
			subject_name: form.subject_name,
			customer: form.customer,
			estimate_date: form.estimate_date,
			estimate_deadline_date: form.estimate_deadline_date,
			payment_terms: form.payment_terms,
			quotation_source: form.quotation_source,
			tax: form.tax,
			amount: form.amount,
			info: form.info,
			estimate_detail: []
		}
	)
}
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
