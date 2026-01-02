
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import TransactionArc from './TransactionArc';
import earthSpecularMap from '../../assets/earth_specular.jpg';

// Helper to get pixel brightness from image data
const getPixelBrightness = (ctx, u, v) => {
    if (!ctx) return 0;
    const x = Math.floor(u * (ctx.canvas.width - 1));
    const y = Math.floor(v * (ctx.canvas.height - 1));
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    return pixel[0]; // Red channel as brightness
};

// Generate points based on earth map
const generateGlobePoints = (count, radius, image) => {
    return new Promise((resolve) => {
        if (!image) {
            console.warn("Globe: No image provided, falling back to random.");
            const points = new Float32Array(count * 3);
            for (let i = 0; i < count; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);
                // Y-up conversion
                points[i * 3] = -radius * Math.sin(phi) * Math.cos(theta); // x
                points[i * 3 + 1] = radius * Math.cos(phi); // y
                points[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta); // z
            }
            resolve(points);
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        const points = [];
        const maxAttempts = count * 100;
        let attempts = 0;
        let pointsFound = 0;

        while (pointsFound < count && attempts < maxAttempts) {
            attempts++;

            // Random point on sphere
            const theta = Math.random() * Math.PI * 2; // 0 to 2PI
            const phi = Math.acos((Math.random() * 2) - 1); // 0 to PI

            // Map to UV coordinates
            // Theta 0 (lon -180) -> u=0
            const u = theta / (Math.PI * 2);
            // Phi 0 (North Pole) -> v=0
            const v = phi / Math.PI;

            const brightness = getPixelBrightness(ctx, u, v);

            // Rejection sampling
            if (Math.random() * 255 < brightness) {
                // Y-up conversion matching latLongToVector3
                const x = -radius * Math.sin(phi) * Math.cos(theta);
                const y = radius * Math.cos(phi);
                const z = radius * Math.sin(phi) * Math.sin(theta);

                points.push(x, y, z);
                pointsFound++;
            }
        }

        console.log(`Globe: Generated ${pointsFound} points after ${attempts} attempts.`);
        resolve(new Float32Array(points));
    });
};

// Top 3 Countries per Region (Reduced from 5)
const countries = [
    // North America
    { name: "USA", lat: 37.0902, lon: -95.7129, region: "NA" },
    { name: "Canada", lat: 56.1304, lon: -106.3468, region: "NA" },
    { name: "Mexico", lat: 23.6345, lon: -102.5528, region: "NA" },

    // South America
    { name: "Brazil", lat: -14.2350, lon: -51.9253, region: "SA" },
    { name: "Argentina", lat: -38.4161, lon: -63.6167, region: "SA" },
    { name: "Colombia", lat: 4.5709, lon: -74.2973, region: "SA" },

    // Europe
    { name: "France", lat: 46.2276, lon: 2.2137, region: "EU" },
    { name: "Germany", lat: 51.1657, lon: 10.4515, region: "EU" },
    { name: "UK", lat: 55.3781, lon: -3.4360, region: "EU" },

    // Africa
    { name: "Nigeria", lat: 9.0820, lon: 8.6753, region: "AF" },
    { name: "South Africa", lat: -30.5595, lon: 22.9375, region: "AF" },
    { name: "Egypt", lat: 26.8206, lon: 30.8025, region: "AF" },

    // Asia
    { name: "China", lat: 35.8617, lon: 104.1954, region: "AS" },
    { name: "India", lat: 20.5937, lon: 78.9629, region: "AS" },
    { name: "Japan", lat: 36.2048, lon: 138.2529, region: "AS" },
];

// Helper to convert lat/lon to 3D position
const latLongToVector3 = (lat, lon, r) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(r * Math.sin(phi) * Math.cos(theta));
    const z = r * Math.sin(phi) * Math.sin(theta);
    const y = r * Math.cos(phi);
    return [x, y, z];
};

const GlobePoints = ({ radius = 2.5, pointCount = 15000 }) => {
    const pointsRef = useRef();
    const [positions, setPositions] = useState(null);

    // Generate points from image
    useEffect(() => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = earthSpecularMap;
        img.onload = async () => {
            // Small delay to ensure clean render
            setTimeout(async () => {
                const points = await generateGlobePoints(pointCount, radius, img);
                setPositions(points);
            }, 100);
        };
        img.onerror = () => {
            console.error("Globe: Failed to load earth texture");
            generateGlobePoints(pointCount, radius, null).then(setPositions);
        };
    }, [pointCount, radius]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const time = state.clock.getElapsedTime();
        pointsRef.current.rotation.y = time * 0.05;
    });

    if (!positions) return null;

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#60a5fa"
                sizeAttenuation={true}
                transparent={true}
                opacity={0.8}
            />
        </points>
    );
};

const CountryMarker = ({ country, radius }) => {
    const position = useMemo(() => latLongToVector3(country.lat, country.lon, radius), [country, radius]);

    return (
        <group position={position}>
            <mesh>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
            <Html distanceFactor={10} occlude>
                <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-[8px] text-white whitespace-nowrap border border-white/10 pointer-events-none select-none">
                    {country.name}
                </div>
            </Html>
        </group>
    );
};

// Camera controller for scroll animations
const ScrollCamera = ({ scrollYProgress, isMobile }) => {
    useFrame((state) => {
        if (scrollYProgress) {
            const progress = scrollYProgress.get();

            // Delay zoom until 25% scroll to let text fade first
            const delayedProgress = THREE.MathUtils.smoothstep(progress, 0.25, 1.0);

            // Zoom Ranges
            // Desktop: 4.9 (Big) -> 22 (Small)
            // Mobile: 12 (Smaller Start) -> 25 (Small)
            const startDist = isMobile ? 12 : 4.9;
            const endDist = isMobile ? 25 : 22;

            const targetDistance = THREE.MathUtils.lerp(startDist, endDist, delayedProgress);

            const currentDist = state.camera.position.length();
            const nextDist = THREE.MathUtils.lerp(currentDist, targetDistance, 0.1);

            state.camera.position.setLength(nextDist);
        }
    });
    return null;
};

const Globe = ({ scrollYProgress }) => {
    const radius = 3.5;
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile viewport
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Generate arcs from countries
    const arcs = useMemo(() => {
        return countries.map((country, i) => {
            // Pick a random target country that isn't the current one
            let target;
            do {
                target = countries[Math.floor(Math.random() * countries.length)];
            } while (target === country);

            return {
                start: { lat: country.lat, lon: country.lon },
                end: { lat: target.lat, lon: target.lon },
                color: i % 2 === 0 ? '#00f3ff' : '#ffd700', // Alternate colors
                delay: Math.random() * 5 // Random delay
            };
        });
    }, []);

    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, isMobile ? 12 : 4.9], fov: 45 }}>
                <ScrollCamera scrollYProgress={scrollYProgress} isMobile={isMobile} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 5]} intensity={1} color="#00f3ff" />
                <pointLight position={[-10, -5, -5]} intensity={1} color="#ffd700" />

                <group rotation={[0.3, 0, 0]}>
                    <GlobePoints radius={3.5} pointCount={4000} />

                    {/* Inner Sphere for depth */}
                    <mesh>
                        <sphereGeometry args={[3.45, 32, 32]} />
                        <meshBasicMaterial color="#000000" transparent opacity={0.9} />
                    </mesh>

                    {/* Country Markers */}
                    {countries.map((country, i) => (
                        <CountryMarker key={i} country={country} radius={radius} />
                    ))}

                    {/* Arcs */}
                    {arcs.map((arc, i) => (
                        <TransactionArc
                            key={i}
                            start={arc.start}
                            end={arc.end}
                            color={arc.color}
                            delay={arc.delay}
                            radius={radius}
                        />
                    ))}
                </group>

                <OrbitControls
                    enableZoom={false}
                    enableRotate={!isMobile}
                    autoRotate
                    autoRotateSpeed={0.5}
                    enablePan={false}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI - Math.PI / 4}
                />
            </Canvas>
        </div>
    );
};

export default Globe;
