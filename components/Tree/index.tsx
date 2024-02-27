import {Tree, TreeNode} from "react-organizational-chart";
import {Text} from "@/components/Text";
import AnimalDTO from "@/utils/AnimalDTO";

export async function TreeAnimal (animal: AnimalDTO) {

    return <Tree
        label={
            <div
                style={{
                    "display": "flex",
                    "justifyContent": "center",
                    "rotate": "90deg"
                }}
            >
                <Text
                    text={animal?.nomeAnimal}
                    fontFamily="rob"
                    fontWeight="600"
                    size="1.6vw"
                    color="black"
                />
            </div>
        }
    >
        <TreeNode
            label={
                <div
                    style={{
                        "display": "flex",
                        "justifyContent": "center",
                        "rotate": "90deg"
                    }}
                >
                    <Text
                        text={animal.maeAnimal?.nomeAnimal || ""}
                        fontFamily="rob"
                        fontWeight="600"
                        size="1.6vw"
                        color="black"
                    />
                </div>
            }
        >
            <TreeNode
                label={
                    <div
                        style={{
                            "rotate": "90deg",
                            "display": "flex",
                            "justifyContent": "center"
                        }}
                    >
                        <Text
                            text={animal.maeAnimal?.maeAnimal?.nomeAnimal}
                            fontFamily="rob"
                            fontWeight="600"
                            size="1.6vw"
                            color="black"
                        />
                    </div>
                }
            ></TreeNode>

            <TreeNode
                label={
                    <div
                        style={{
                            "rotate": "90deg",
                            "display": "flex",
                            "justifyContent": "center"
                        }}
                    >
                        <Text
                            text={animal.maeAnimal?.paiAnimal?.nomeAnimal}
                            fontFamily="rob"
                            fontWeight="600"
                            size="1.6vw"
                            color="black"
                        />
                    </div>
                }
            ></TreeNode>
        </TreeNode>

        <TreeNode
            label={
                <div
                    style={{
                        "rotate": "90deg",
                        "display": "flex",
                        "justifyContent": "center"
                    }}
                >
                    <Text
                        text={animal.paiAnimal?.nomeAnimal || ""}
                        fontFamily="rob"
                        fontWeight="600"
                        size="1.6vw"
                        color="black"
                    />
                </div>
            }
        >
            <TreeNode
                label={
                    <div
                        style={{
                            "rotate": "90deg",
                            "display": "flex",
                            "justifyContent": "center"
                        }}
                    >
                        <Text
                            text={animal.paiAnimal?.maeAnimal?.nomeAnimal || ""}
                            fontFamily="rob"
                            fontWeight="600"
                            size="1.6vw"
                            color="black"
                        />
                    </div>
                }
            ></TreeNode>

            <TreeNode
                label={
                    <div
                        style={{
                            "rotate": "90deg",
                            "display": "flex",
                            "justifyContent": "center"
                        }}
                    >
                        <Text
                            text={animal.paiAnimal?.paiAnimal?.nomeAnimal || ""}
                            fontFamily="rob"
                            fontWeight="600"
                            size="1.6vw"
                            color="black"
                        />
                    </div>
                }
            ></TreeNode>
        </TreeNode>
    </Tree>;

}
