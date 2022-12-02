<template>
	<div class="sidebar">
		<el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="sidebar.collapse"
			background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
			<template v-for="item in items">
				<template v-if="item.subs">
					<el-sub-menu :index="item.index" :key="item.index" v-permiss="item.permiss">
						<template #title>
							<el-icon>
								<component :is="item.icon"></component>
							</el-icon>
							<span>{{ item.title }}</span>
						</template>
						<template v-for="subItem in item.subs" :key="subItem.index">
							<el-menu-item :index="subItem.index" v-permiss="item.permiss">
								{{ subItem.title }}
							</el-menu-item>
						</template>
					</el-sub-menu>
				</template>
				<template v-else>
					<el-menu-item :index="item.index" :key="item.index" v-permiss="item.permiss">
						<el-icon>
							<component :is="item.icon"></component>
						</el-icon>
						<template #title>{{ item.title }}</template>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRoute } from 'vue-router';

const items = [
	{
		icon: 'Odometer',
		index: '/dashboard',
		title: 'ホームページ',
		permiss: '1'
	},
	{
		icon: 'DocumentCopy',
		index: '',
		title: '業務管理',
		permiss: '2',
		subs: [
			{
				index: '/estimate',
				title: '見積',
				permiss: '2'
			},
			{
				index: '/form',
				title: '受注',
				permiss: '4'
			},
			{
				index: '/form',
				title: '発注',
				permiss: '5'
			},
			{
				index: '/form',
				title: '仕入',
				permiss: '6'
			},
			{
				index: '/form',
				title: '売上',
				permiss: '7'
			},
			{
				index: '/form',
				title: '請求',
				permiss: '8'
			},
			{
				index: '/form',
				title: '支払',
				permiss: '9'
			},
			{
				index: '/form',
				title: '承認',
				permiss: '10'
			}
		]
	},
	{
		icon: 'Setting',
		index: '3',
		title: 'マスタ',
		permiss: '11',
		subs: [
		{
				index: '/form',
				title: '税率マスタ',
				permiss: '12'
			},
			{
				index: '/form',
				title: '分類マスタ',
				permiss: '13'
			},
			{
				index: '/form',
				title: 'ユーザーマスタ',
				permiss: '14'
			},
			{
				index: '/form',
				title: '請求先マスタ',
				permiss: '15'
			},
			{
				index: '/form',
				title: '得意先マスタ',
				permiss: '16'
			},
			{
				index: '/form',
				title: '商品マスタ',
				permiss: '17'
			},
			{
				index: '/form',
				title: '自社マスタ',
				permiss: '18'
			},
			{
				index: '/form',
				title: '部署マスタ',
				permiss: '19'
			}
		]
	}
];

const route = useRoute();
const onRoutes = computed(() => {
	return route.path;
});

const sidebar = useSidebarStore();
</script>

<style scoped>
.sidebar {
	display: block;
	position: absolute;
	left: 0;
	top: 70px;
	bottom: 0;
	overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
	width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
	width: 250px;
}

.sidebar>ul {
	height: 100%;
}
</style>
