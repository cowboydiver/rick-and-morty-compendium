import { Box, Text, useTheme } from "@chakra-ui/react";

export default function ExpandedDataPoint({ header, value }: { header: string, value: string }) {

    const theme = useTheme()

    return (
        <Box>
            <Text fontSize="sm" color={theme.colors.gray[400]}>{header}</Text>
            <Text>{value}</Text>
        </Box>
        );

}