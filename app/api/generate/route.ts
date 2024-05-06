import { NextRequest, NextResponse } from 'next/server';
import { exec } from "child_process";

export async function POST(request: NextRequest) {
    try {
        // Wrap exec in a Promise
        const executeCommand = () => {
            return new Promise<void>((resolve, reject) => {
                exec('npm run generate', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error: ${error.message}`);
                        reject(error);
                    } else if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        reject(new Error(stderr));
                    } else {
                        console.log(`stdout: ${stdout}`);
                        resolve();
                    }
                });
            });
        };

        // Execute the command
        await executeCommand();

        // Return response after command execution completes
        return NextResponse.json({ success: true, message: "Command executed successfully." });
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ success: false, message: "Error generating storage." });
    }
}
