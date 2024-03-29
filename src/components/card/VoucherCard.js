import { View, Image, Text } from 'react-native';

const VoucherCard = ({ image, title, content, expired }) => {
    return (
        <View style={{ flexDirection: 'row', width: '100%', padding: 20 }}>
            <Image
                source={{ uri: `data:image/jpeg;base64,${image}` }}
                style={{ height: 70, width: 70 }}
            />
            <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                <Text
                    style={{
                        color: '#454545',
                        fontSize: 16,
                        fontWeight: '700',
                        marginBottom: 5,
                    }}
                >
                    {title}
                </Text>
                <Text
                    style={{
                        color: '#454545',
                        fontSize: 16,
                        fontWeight: '400',
                    }}
                >
                    {content}
                </Text>
                <Text
                    style={{
                        color: '#DE3636',
                        fontSize: 14,
                        fontWeight: '400',
                    }}
                >
                    {expired}
                </Text>
            </View>
        </View>
    );
};

export default VoucherCard;
