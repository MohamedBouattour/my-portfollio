import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = 'https://my-porfollio-backend.onrender.com/api';

export default function AdminProjectDetails() {
    const { id } = useParams(); // 1. useParams : Récupérer l'ID depuis l'URL
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // 2. useRef : Référence mutable qui ne provoque pas de re-render
    const renderCount = useRef(0);
    // 2. useRef : Référence directe au DOM (input)
    const titleInputRef = useRef<HTMLInputElement>(null);

    // 3. useEffect : Se déclenche à chaque rendu
    useEffect(() => {
        renderCount.current = renderCount.current + 1;
        console.log(`Composant rendu ${renderCount.current} fois`);
    });

    // 3. useEffect : Se déclenche uniquement au montage (initialisation)
    useEffect(() => {
        // Focus sur l'input titre si le projet est chargé
        if (project && titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [project]); // Dépendance : [project] (quand le projet arrive)

    // 3. useEffect : Se déclenche quand 'id' change
    useEffect(() => {
        if (id) {
            fetchProjectDetails(id);
        }

        // Fonction de nettoyage (Cleanup function)
        return () => {
            console.log(`Nettoyage du composant pour le projet ${id}`);
            // Utile pour annuler des requêtes ou des abonnements
        };
    }, [id]);

    async function fetchProjectDetails(projectId: string) {
        setLoading(true);
        try {
            // Simulation d'appel API (remplacer par vrai fetch)
            // const response = await fetch(`${API_URL}/projects/${projectId}`);
            // const data = await response.json();

            // Mock data pour l'exemple
            setTimeout(() => {
                setProject({
                    id: projectId,
                    title: `Projet ${projectId}`,
                    description: "Description détaillée du projet avec gestion des états complexes.",
                    technologies: ["React", "TypeScript", "Tailwind"]
                });
                setLoading(false);
            }, 500);

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    if (loading) return <div className="p-8 text-center">Chargement...</div>;
    if (!project) return <div className="p-8 text-center">Projet non trouvé</div>;

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-10">
            <div className="mb-6">
                <Link to="/admin/projects" className="text-blue-600 hover:underline">← Retour à la liste</Link>
            </div>

            <h1 className="text-3xl font-bold mb-4">Détails du Projet (ID: {id})</h1>

            <div className="mb-6 bg-yellow-50 p-4 rounded border border-yellow-200 text-sm">
                <p><strong>Note Pédagogique :</strong> Regardez la console pour voir les logs du cycle de vie (useEffect).</p>
                <p>Nombre de rendus (useRef) : {renderCount.current}</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block font-bold mb-1">Titre (Edit)</label>
                    <input
                        ref={titleInputRef} // Liaison du DOM à la ref
                        defaultValue={project.title}
                        className="w-full border p-2 rounded"
                    />
                    <p className="text-xs text-gray-500 mt-1">L'input reçoit le focus automatiquement grâce à useEffect + useRef.</p>
                </div>

                <div>
                    <h3 className="font-bold">Technologies :</h3>
                    <ul className="list-disc pl-5">
                        {project.technologies.map((tech: string) => <li key={tech}>{tech}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
}
