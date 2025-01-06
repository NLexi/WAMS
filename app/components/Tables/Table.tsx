import { IconDotsVertical } from "@tabler/icons-react"
import { Button } from "../Buttons/Button";

type ContentData = Record<string, any>

type TableProps = {
    headerItems: string[];
    contentData: ContentData[];
}

export function Table({ headerItems, contentData = [] }: TableProps) {

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className='border-b border-gray-300'>
                    <tr className="table-header">
                        {headerItems.map((item, index) => (
                            <th key={index} className="px-4 py-2 font-normal font-inter text-inactive">
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {contentData.map((content, contentIndex) => (
                        <tr key={contentIndex} className="border-b border-gray-300 last:border-0">
                            {headerItems.map((header, headerIndex) => (
                                <td key={headerIndex} className="px-4 py-2">
                                    {header === "Action" ? (
                                        <Button icon={<IconDotsVertical/>} variant='tertiary'></Button>
                                    ) : (
                                        content[header]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}