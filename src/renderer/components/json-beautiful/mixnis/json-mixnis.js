export default {
	props: {
		data: {
			required: true
		},
	},
	computed: {
		
	},
	methods: {
		isObject(data){
            return this.getDataType(data) == 'object' && data != null;
		},
		toggleSymbol(){
            this.$emit('update:visible', !this.visible)
		},
		keyDataFormat(key){
            let text = key + '';
            text = `"${text}":`;
            return text;
		},
		getDataType(val){
			return Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
		}
	}
}