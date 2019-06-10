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
            return typeof data == 'object' && data != null;
		},
		toggleSymbol(){
            this.$emit('update:visible', !this.visible)
		},
		keyDataFormat(key){
            let text = key + '';
            text = `"${text}":`;
            return text;
        }
	}
}