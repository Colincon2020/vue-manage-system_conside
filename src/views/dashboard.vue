<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-card shadow="hover" class="mgb20" style="height: 403px">
					<div class="user-info">
						<el-avatar :size="120" :src="imgurl" />
						<div class="user-info-cont">
							<div class="user-info-name">{{ name }}</div>
							<div>{{ role }}</div>
						</div>
					</div>
					<div class="user-info-list">
						前回の登録日付：
						<span>2022-10-01</span>
					</div>
				</el-card>
			</el-col>
			<el-col :span="16">
				<el-card shadow="hover" style="height: 403px">
					<template #header>
						<div class="clearfix">
							<span>HOME</span>
						</div>
					</template>
					<el-row :gutter="20">
						<el-col :span="5" :offset="5">
							<div>
								<h3>業務管理▼</h3>
								<p>
									<el-button type="text" size="default" @click="">見積</el-button>
								</p>
								<p>
									<el-button type="text" size="default" @click="">受注</el-button>
								</p>
								<p>
									<el-button type="text" size="default" @click="">発注</el-button>
								</p>
								<p>
									<el-button type="text" size="default" @click="">仕入</el-button>
								</p>
								<p>
									<el-button type="text" size="default" @click="">売上</el-button>
								</p>
								<p>
									<el-button type="text" size="default" @click="">請求</el-button>
								</p>
								<p>
									<el-button type="text" size="default" @click="">支払</el-button>
								</p>
								<p>
									<el-button type="text" size="default" @click="">承認</el-button>
								</p>
							</div>
						</el-col>
						<el-col :span="5" :offset="5">
							<div>
								<h3>マスタ▼</h3>
								<p>
									<el-button type="text" size="default" @click="">税率マスタ</el-button>
								</p>
								<p>
									<el-button type="text" size="default" @click="">分類マスタ</el-button>
								</p>
								<p>
									<el-button type="text" size="default" @click="">ユーザーマスタ</el-button>
								</p>
								<p>
									<el-button type="text" size="default" @click="">請求先マスタ</el-button>
								</p>
								<p>
									<el-button type="text" size="default" @click="">得意先マスタ</el-button>
								</p>
								<p>
									<el-button type="text" size="default" @click="">商品マスタ</el-button>
								</p>
								<p>
									<el-button type="text" size="default" @click="">自社マスタ</el-button>
								</p>
								<p>
									<el-button type="text" size="default" @click="">部署マスタ</el-button>
								</p>
							</div>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="dashboard">
import { reactive } from 'vue';
import imgurl from '../assets/img/img.jpg';

const name = localStorage.getItem('ms_username');
const role: string = name === 'admin' ? 'admin' : 'user';


</script>

<style scoped>
.user-info {
	display: flex;
	align-items: center;
	padding-bottom: 20px;
	border-bottom: 2px solid #ccc;
	margin-bottom: 20px;
}

.user-info-cont {
	padding-left: 50px;
	flex: 1;
	font-size: 14px;
	color: #999;
}

.user-info-cont div:first-child {
	font-size: 30px;
	color: #222;
}

.user-info-list {
	font-size: 14px;
	color: #999;
	line-height: 25px;
}

.user-info-list span {
	margin-left: 70px;
}

.mgb20 {
	margin-bottom: 20px;
}

.todo-item {
	font-size: 14px;
}

.todo-item-del {
	text-decoration: line-through;
	color: #999;
}
</style>
