import { useState } from 'react';

interface TeacherButtonProps {
    title?: string;
    content?: React.ReactNode;
    answers?: React.ReactNode;
}

function TeacherButton({
    title,
    content,
    answers
}: TeacherButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-3 px-6 py-3 text-white font-semibold transition-all"
                style={{
                    borderRadius: '0 30px 30px 0',
                    backgroundColor: '#BF3154',
                    boxShadow: '0 4px 0 0 #9C2F4B',
                }}
            >
                <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: '#BF3154',
                        boxShadow: '0 2px 0 0 #9C2F4B',
                    }}
                >
                    <img
                        src="/images/iconTeacher.svg"
                        alt="Ícone Professor"
                        style={{
                            width: '40.316px',
                            height: '40.316px',
                        }}
                    />
                </div>
                <span>PARA O PROFESSOR</span>
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-slate-800">PARA O PROFESSOR</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-500 hover:text-slate-700 text-2xl font-bold"
                            >
                                ×
                            </button>
                        </div>

                        {title && (
                            <h4 className="text-xl font-semibold text-slate-700 mb-4">{title}</h4>
                        )}

                        {content && (
                            <div className="mb-6">
                                <div className="text-slate-700 prose max-w-none">
                                    {content}
                                </div>
                            </div>
                        )}

                        {answers && (
                            <div>
                                <h5 className="text-lg font-semibold text-slate-600 mb-3">Respostas:</h5>
                                <div className="text-slate-700 prose max-w-none">
                                    {answers}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            )}
        </>
    );
}

export default TeacherButton;

