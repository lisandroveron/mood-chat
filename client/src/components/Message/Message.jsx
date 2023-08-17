export default function Message({message, polarity, subjectivity}){
	function parseColor(polarity, subjectivity){
		const positive_polarity = `rgba(47, 201, 24, ${subjectivity})`;
		const neutral_polarity = `rgba(109, 109, 109, ${subjectivity})`;
		const negative_polarity = `rgba(224, 40, 40, ${subjectivity})`;

		const high_limit = .165;
		const low_limit = -.33;

		if(high_limit <= polarity){
			return positive_polarity;
		}else if(low_limit < polarity && polarity < high_limit){
			return neutral_polarity;
		}else if(polarity <= low_limit){
			return negative_polarity;
		};
	};

	const messageStyle = {
		backgroundColor: parseColor(polarity, subjectivity),
	};

	return (<>
		<p style={messageStyle}>{message}</p>
	</>);
};