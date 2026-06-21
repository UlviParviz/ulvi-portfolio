import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import ProjectsScene from "./ProjectsScene";
import type { Repo } from "./types";
import { getRepoColor } from "./constants";
import { SELECTED_REPOS } from "../../data/portfolio";

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME

const normalizeRepoName = (name: string) => {
    return name.trim().toLowerCase();
};

export default function GitHubProjects() {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRepoId, setSelectedRepoId] = useState<number | undefined>();

    const pinnedRepoNames = useMemo(() => {
        return SELECTED_REPOS?.map(normalizeRepoName);
    }, []);

    useEffect(() => {
        let ignore = false;

        async function getRepos() {
            setLoading(true);

            try {
                const res = await axios.get<Repo[]>(
                    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`
                );

                const repoMap = new Map(
                    res.data.map((repo) => [normalizeRepoName(repo.name), repo])
                );

                const selectedRepos = pinnedRepoNames
                    .map((repoName) => repoMap.get(repoName))
                    .filter((repo): repo is Repo => Boolean(repo));

                const missingRepos = pinnedRepoNames.filter(
                    (repoName) => !repoMap.has(repoName)
                );

                if (missingRepos.length) {
                    console.warn("Tapılmayan repo adları:", missingRepos);
                }

                if (!ignore) {
                    setRepos(selectedRepos);
                    setSelectedRepoId(selectedRepos[0]?.id);
                }
            } catch {
                if (!ignore) {
                    setRepos([]);
                    setSelectedRepoId(undefined);
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        getRepos();

        return () => {
            ignore = true;
        };
    }, [pinnedRepoNames, GITHUB_USERNAME]);

    const selectedRepo = useMemo(() => {
        return repos.find((repo) => repo.id === selectedRepoId) || repos[0];
    }, [repos, selectedRepoId]);

    const selectedColor = getRepoColor(selectedRepo?.language || null);

    return (
        <section className="section github-section" id="projects">
            <div className="github-section__header">
                <div>
                    <span className="section-label">Projects</span>
                    <h2>Repository Vault</h2>
                </div>
            </div>

            <div className="github-section__layout">
                <motion.div
                    className="github-vault-wrapper"
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    {repos.length > 0 ? (
                        <>
                            <div className="github-vault-wrapper__top">
                                <span>Repository vault</span>
                                <strong>{selectedRepo?.name}</strong>
                            </div>

                            <ProjectsScene
                                repos={repos}
                                selectedRepoId={selectedRepoId}
                                onSelectRepo={setSelectedRepoId}
                            />
                        </>
                    ) : (
                        <div className="github-empty-state">
                            {loading ? "Repo-lar yüklənir..." : "Seçilmiş repo tapılmadı."}
                        </div>
                    )}
                </motion.div>

                <motion.aside
                    className="glass-card github-terminal"
                    initial={{ opacity: 0, x: 70 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="github-terminal__header">
                        <div>
                            <span>Project terminal</span>
                            <strong>{repos.length} selected repos</strong>
                        </div>

                        <div className="github-terminal__dots">
                            <i />
                            <i />
                            <i />
                        </div>
                    </div>

                    {selectedRepo && (
                        <div
                            className="github-terminal__preview"
                            style={
                                {
                                    "--repo-color": selectedColor,
                                } as CSSProperties
                            }
                        >
                            <span>{selectedRepo.language || "Code"}</span>
                            <h3>{selectedRepo.name}</h3>
                            <p>{selectedRepo.description || "No description added yet."}</p>

                            <div className="github-terminal__meta">
                                <small>⭐ {selectedRepo.stargazers_count}</small>
                                <small>⑂ {selectedRepo.forks_count}</small>
                            </div>

                            <div className="github-terminal__actions">
                                <a href={selectedRepo.html_url} target="_blank" rel="noreferrer">
                                    GitHub
                                </a>

                                {selectedRepo.homepage && (
                                    <a href={selectedRepo.homepage} target="_blank" rel="noreferrer">
                                        Live demo
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="github-terminal__list">
                        {repos.map((repo) => {
                            const repoColor = getRepoColor(repo.language);

                            return (
                                <button
                                    key={repo.id}
                                    type="button"
                                    className={selectedRepoId === repo.id ? "active" : ""}
                                    onClick={() => setSelectedRepoId(repo.id)}
                                    style={
                                        {
                                            "--repo-color": repoColor,
                                        } as CSSProperties
                                    }
                                >
                                    <span />
                                    <div>
                                        <strong>{repo.name}</strong>
                                        <small>{repo.language || "Code"}</small>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </motion.aside>
            </div>
        </section>
    );
}